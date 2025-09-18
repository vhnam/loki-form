import { useMutation } from '@tanstack/react-query';

import apiClient from '@/utils/apiClient';

import { FormBuilderSchema } from '@/schemas/form';

export const useCreateFormMutation = () => {
  return useMutation({
    mutationFn: async (payload: FormBuilderSchema) => {
      const response = await apiClient.post('/forms/complete', payload);
      return response.data;
    },
  });
};
