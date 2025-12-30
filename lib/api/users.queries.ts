import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import useApiFetch from '@/lib/use-api-fetch';

// ****************************************************************************
// Current User With Companies Query

export interface CurrentUserCompany {
  id: number;
  name: string;
}
export interface CurrentUserWithCompaniesResponse {
  id: number;
  email: string;
  companies: CurrentUserCompany[];
}

export const useCurrentUserWithCompaniesQuery = (
  queryOptions?: Partial<
    UseQueryOptions<CurrentUserWithCompaniesResponse, Error>
  >,
) => {
  const apiFetch = useApiFetch();

  return useQuery({
    queryKey: ['current-user-with-companies'],
    queryFn: async () => {
      const response = await apiFetch('/users/current/with-companies');
      return response.json();
    },
    staleTime: Infinity,
    ...queryOptions,
  });
};
