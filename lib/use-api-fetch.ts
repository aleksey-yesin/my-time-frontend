import { useAtom } from 'jotai';
import { accessTokenAtom, refreshTokenAtom } from '@/lib/atoms/auth.atoms';

/******************************************************************************
 * Fetch wrapper with:
 * - Authentication
 * - Content-Type: application/json
 * - Error throwing
 */

type ApiFetchOptions = {
  withAuth?: boolean;
} & RequestInit;

const useApiFetch = () => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);

  const apiFetch = async (
    fetchInput: string | URL | Request,
    options: ApiFetchOptions = {},
  ) => {
    const { withAuth = true, ...fetchInit } = options;
    const extraHeaders: Record<string, string> = {};

    if (withAuth && accessToken) {
      extraHeaders.Authorization = `Bearer ${accessToken}`;
    }
    if (typeof fetchInit?.body === 'string') {
      extraHeaders['Content-Type'] = 'application/json';
    }
    const response = await fetch(fetchInput, {
      ...fetchInit,
      headers: {
        ...extraHeaders,
        ...fetchInit?.headers,
      },
    });
    if (withAuth && response.status === 401) {
      setAccessToken(null);
      setRefreshToken(null);
    }
    if (!response.ok) {
      throw new Error(`Status ${response.status}: ${response.statusText}`);
    }
    return response;
  };

  return apiFetch;
};

export default useApiFetch;
