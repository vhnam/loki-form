import { useQuery } from '@tanstack/react-query';

import axios from '@/utils/apiClient';

interface GetFormsQueryParams {
  query?: string;
  page: number;
  perPage: number;
  sortBy: string;
  sortOrder: string;
}

export const profileQueryKey = {
  getProfile: ({
    page,
    perPage,
    sortBy,
    sortOrder,
    query,
  }: GetFormsQueryParams) => [
    '/forms',
    page,
    perPage,
    sortBy,
    sortOrder,
    query,
  ],
};

export const useGetFormsQuery = ({
  page = 1,
  perPage = 10,
  sortBy = 'createdAt',
  sortOrder = 'desc',
  query,
}: GetFormsQueryParams) => {
  return useQuery({
    queryKey: profileQueryKey.getProfile({
      page,
      perPage,
      sortBy,
      sortOrder,
      query,
    }),
    queryFn: async () => {
      const response = await axios.get('/forms', {
        params: {
          page,
          perPage,
          sortBy,
          sortOrder,
          query,
        },
      });
      return response.data;
    },
  });
};
