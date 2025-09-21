import { useMutation } from '@tanstack/react-query';

import apiClient from '@/utils/apiClient';

import type { CreateCompleteFormRequest } from '@/types/form/forms.request';

export const useCreateFormMutation = () => {
  return useMutation({
    mutationFn: async (payload: CreateCompleteFormRequest) => {
      const response = await apiClient.post('/forms/complete', payload);
      return response.data;
    },
  });
};
