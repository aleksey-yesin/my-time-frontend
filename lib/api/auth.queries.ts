import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { apiBaseUrl } from '@/lib/environment';
import { useApiFetch } from './api-fetch.hook';

// ****************************************************************************
// Login Query

export interface LoginParams {
  email: string;
  password: string;
}
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export const useLoginMutation = (
  mutationOptions?: UseMutationOptions<LoginResponse, Error, LoginParams>,
) => {
  const apiFetch = useApiFetch();

  return useMutation({
    mutationFn: async (params) => {
      const response = await apiFetch(`${apiBaseUrl}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(params),
        withAuth: false,
      });
      return response.json();
    },
    ...mutationOptions,
  });
};
