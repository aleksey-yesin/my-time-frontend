import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import useApiFetch from '@/lib/use-api-fetch';

// ****************************************************************************
// Login Mutation

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
      const response = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(params),
        skipAuth: true,
      });
      return response.json();
    },
    ...mutationOptions,
  });
};

// ****************************************************************************
// Logout Mutation

export interface LogoutParams {
  refresh_token: string;
}

export const useLogoutMutation = (
  mutationOptions?: UseMutationOptions<void, Error, LogoutParams>,
) => {
  const apiFetch = useApiFetch();

  return useMutation({
    mutationFn: async (params) => {
      await apiFetch('/auth/logout', {
        method: 'POST',
        body: JSON.stringify(params),
        skipAuth: true,
      });
    },
    ...mutationOptions,
  });
};

// ****************************************************************************
// Logout All Mutation

export const useLogoutAllMutation = (
  mutationOptions?: UseMutationOptions<void>,
) => {
  const apiFetch = useApiFetch();

  return useMutation({
    mutationFn: async () => {
      await apiFetch('/auth/logout-all', {
        method: 'POST',
      });
    },
    ...mutationOptions,
  });
};

// ****************************************************************************
// Register Mutation

export interface RegisterParams {
  email: string;
  password: string;
}
export interface RegisterResponse {
  access_token: string;
  refresh_token: string;
}

export const useRegisterMutation = (
  mutationOptions?: UseMutationOptions<RegisterResponse, Error, RegisterParams>,
) => {
  const apiFetch = useApiFetch();

  return useMutation({
    mutationFn: async (params) => {
      const response = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(params),
        skipAuth: true,
      });
      return response.json();
    },
    ...mutationOptions,
  });
};
