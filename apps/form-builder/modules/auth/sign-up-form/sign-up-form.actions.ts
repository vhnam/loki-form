import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { type SignUpFormSchema, signUpFormSchema } from '@/schemas/auth';

import { useSignUpMutation } from '@/services/auth';

const useSignUpFormActions = () => {
  const { mutateAsync, isPending } = useSignUpMutation();

  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (payload: SignUpFormSchema) => {
    return await mutateAsync(payload);
  };

  return { form, onSubmit, isPending };
};

export default useSignUpFormActions;
