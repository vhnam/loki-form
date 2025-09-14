import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { type FormBuilderSchema, formBuilderSchema } from '@/schemas/form';

const useFormNewActions = () => {
  const sectionId = uuidv4();
  const form = useForm<FormBuilderSchema>({
    resolver: zodResolver(formBuilderSchema),
    defaultValues: {
      title: 'Untitled',
      description: '',
      isActive: true,
      version: 1,
      multiPage: false,
      allowDrafts: false,
      requireAuth: false,
      submitMessage: '',
      redirectUrl: '',
      sections: [
        {
          id: sectionId,
          title: 'Untitled',
          description: '',
          fields: [],
        },
      ],
    },
  });

  return { form };
};

export default useFormNewActions;
