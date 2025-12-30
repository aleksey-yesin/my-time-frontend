import { useSetAtom, useStore } from 'jotai';
import { Mutex } from 'async-mutex';
import {
  accessTokenAtom,
  refreshTokenAtom,
  setTokensAtom,
  unsetTokensAtom,
} from '@/lib/atoms/auth.atoms';
import { apiBaseUrl } from './environment';

/******************************************************************************
 * Fetch wrapper with:
 * - Authentication
 * - Token refresh
 * - Base URL
 * - Content-Type: application/json
 * - Error throwing
 */

type ApiFetchOptions = {
  skipAuth?: boolean;
} & RequestInit;

const mutex = new Mutex();

const useRefreshAndUpdateStore = () => {
  const { get } = useStore();
  const setTokens = useSetAtom(setTokensAtom);
  const unsetTokens = useSetAtom(unsetTokensAtom);

  return async () => {
    const response = await fetch(`${apiBaseUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh_token: get(refreshTokenAtom),
      }),
    });
    if (response.ok) {
      const json = await response.json();
      setTokens({
        access: json.access_token,
        refresh: json.refresh_token,
      });
    } else {
      unsetTokens();
    }
    return response;
  };
};

const throwIfNotOk = (response: Response) => {
  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`);
  }
  return response;
};

const useApiFetch = () => {
  const { get } = useStore();
  const refreshAndUpdateStore = useRefreshAndUpdateStore();

  return async (
    url: string,
    { skipAuth, ...fetchOptions }: ApiFetchOptions = {},
  ) => {
    const extendedUrl = url.startsWith('/') ? `${apiBaseUrl}${url}` : url;

    const getExtendedOptions = () => {
      const extraHeaders: HeadersInit = {};
      const accessToken = get(accessTokenAtom);

      if (!skipAuth && accessToken) {
        extraHeaders.Authorization = `Bearer ${accessToken}`;
      }
      if (typeof fetchOptions.body === 'string') {
        extraHeaders['Content-Type'] = 'application/json';
      }
      return {
        ...fetchOptions,
        headers: {
          ...extraHeaders,
          ...fetchOptions.headers,
        },
      };
    };

    await mutex.waitForUnlock();
    let response = await fetch(extendedUrl, getExtendedOptions());

    if (!skipAuth && response.status === 401) {
      const refreshToken = get(refreshTokenAtom);

      if (mutex.isLocked()) {
        await mutex.waitForUnlock();
        response = await fetch(extendedUrl, getExtendedOptions());
      } else if (refreshToken) {
        let refreshResponse: Response | undefined = undefined;
        const release = await mutex.acquire();

        try {
          refreshResponse = await refreshAndUpdateStore();
        } finally {
          release();
        }
        if (refreshResponse?.ok) {
          response = await fetch(extendedUrl, getExtendedOptions());
        }
      }
    }
    return throwIfNotOk(response);
  };
};

export default useApiFetch;
