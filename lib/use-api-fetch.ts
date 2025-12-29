import { useSetAtom, useStore } from 'jotai';
import { accessTokenAtom, logoutAtom } from '@/lib/atoms/auth.atoms';

/******************************************************************************
 * Fetch wrapper with:
 * - Authentication
 * - Content-Type: application/json
 * - Error throwing
 */

type ApiFetchOptions = {
  skipAuth?: boolean;
} & RequestInit;

const useApiFetch = () => {
  const { get } = useStore();
  const logout = useSetAtom(logoutAtom);

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
    const response = await fetch(url, getExtendedOptions());

    if (!skipAuth && response.status === 401) {
      logout();
    }
    if (!response.ok) {
      throw new Error(`Status ${response.status}: ${response.statusText}`);
    }
    return response;
  };

  return apiFetch;
};

export default useApiFetch;
