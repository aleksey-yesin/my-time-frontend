import { useAtom } from 'jotai';
import { accessToken } from '@/lib/atoms/auth.atoms';

/******************************************************************************
 * Fetch wrapper with:
 * - Authentication
 * - Content-Type: application/json
 * - Error throwing
 */

type ApiFetchOptions = {
  withAuth?: boolean;
} & RequestInit;

export function useApiFetch() {
  const [token, setToken] = useAtom(accessToken);

  const apiFetch = async (
    fetchInput: string | URL | Request,
    options: ApiFetchOptions = {},
  ) => {
    const { withAuth = true, ...fetchInit } = options;
    const extraHeaders: Record<string, string> = {};

    if (withAuth && token) {
      extraHeaders.Authorization = `Bearer ${token}`;
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
      setToken(null);
    }
    if (!response.ok) {
      throw new Error(`Status ${response.status}: ${response.statusText}`);
    }
    return response;
  };

  return apiFetch;
}
