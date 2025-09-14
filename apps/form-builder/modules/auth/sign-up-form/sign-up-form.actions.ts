import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { PRIVATE_ROUTES } from '@/constants/routes';

import { type SignUpFormSchema, signUpFormSchema } from '@/schemas/auth';

import { useSignUpMutation } from '@/services/auth';

import { useAuthStore } from '@/stores/auth';

const useSignUpFormActions = () => {
  const router = useRouter();
  const { setTheme } = useTheme();
  const { setAuth } = useAuthStore();
  const { mutate, isPending } = useSignUpMutation();

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
    mutate(payload, {
      onSuccess: (response) => {
        setAuth(response.user, response.accessToken, response.refreshToken);
        setTheme(response.user.interfaceMode || 'system');

        router.push(PRIVATE_ROUTES.home);
      },
    });
  };

  return { form, onSubmit, isPending };
};

export default useSignUpFormActions;
