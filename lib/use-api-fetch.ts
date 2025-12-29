import { useSetAtom, useStore } from 'jotai';
import { Mutex } from 'async-mutex';
import {
  accessTokenAtom,
  refreshTokenAtom,
  setTokensAtom,
} from '@/lib/atoms/auth.atoms';
import { apiBaseUrl } from './environment';

/******************************************************************************
 * Fetch wrapper with:
 * - Authentication
 * - Content-Type: application/json
 * - Error throwing
 */

type ApiFetchOptions = {
  skipAuth?: boolean;
} & RequestInit;

const mutex = new Mutex();

const useApiFetch = () => {
  const { get } = useStore();
  const setTokens = useSetAtom(setTokensAtom);

  const apiFetch = async (
    url: string | URL | Request,
    { skipAuth, ...fetchOptions }: ApiFetchOptions = {},
  ) => {
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
    let response = await fetch(url, getExtendedOptions());

    if (!skipAuth && response.status === 401) {
      const refreshToken = get(refreshTokenAtom);

      if (mutex.isLocked()) {
        await mutex.waitForUnlock();
        response = await fetch(url, getExtendedOptions());
      } else if (refreshToken) {
        let refreshResponse: Response | undefined = undefined;
        const release = await mutex.acquire();

        try {
          refreshResponse = await fetch(`${apiBaseUrl}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: refreshToken }),
          });
          if (refreshResponse.ok) {
            const json = await refreshResponse.json();
            setTokens({
              access: json.access_token,
              refresh: json.refresh_token,
            });
          } else {
            setTokens({
              access: null,
              refresh: null,
            });
          }
        } finally {
          release();
        }
        if (refreshResponse.ok) {
          response = await fetch(url, getExtendedOptions());
        }
      }
    }
    if (!response.ok) {
      throw new Error(`Status ${response.status}: ${response.statusText}`);
    }
    return response;
  };

  return apiFetch;
};

export default useApiFetch;
