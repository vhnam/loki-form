import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import { PRIVATE_ROUTES } from '@/constants/routes';

import {
  type FormBuilderSchema,
  type QuestionFormSchema,
  type SectionFormSchema,
  type SectionQuestionSchema,
  formBuilderSchema,
} from '@/schemas/form';

import { useCreateFormMutation } from '@/services/forms/forms.mutations';

const DEFAULT_FORM_VALUES: FormBuilderSchema = {
  title: 'Untitled',
  description: '',
  isActive: true,
  multiPage: false,
  allowDrafts: false,
  requireAuth: false,
  submitMessage: '',
  redirectUrl: '',
  sections: {
    [uuidv4()]: {
      id: uuidv4(),
      title: 'Section #1',
      description: '',
      fields: {},
      order: 0,
      showInfo: true,
    },
  },
};

const useFormNewActions = () => {
  const router = useRouter();

  const { mutate, isPending } = useCreateFormMutation();

  const form = useForm<FormBuilderSchema>({
    resolver: zodResolver(formBuilderSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const addQuestion = (questionData: QuestionFormSchema) => {
    const currentSections = form.getValues('sections');
    if (!currentSections) {
      console.error('No sections found');
      return;
    }

    const sectionKey = Object.keys(currentSections).find(
      (key) => currentSections[key]?.id === questionData.sectionId
    );

    if (!sectionKey) {
      console.error('Section not found:', questionData.sectionId);
      return;
    }

    const newQuestion = {
      id: questionData.id,
      sectionId: questionData.sectionId,
      type: questionData.type,
      label: questionData.label,
      description: questionData.description,
      helperText: questionData.helperText,
      required: questionData.required,
      order: questionData.order,
      attributes: questionData.attributes || {},
    };

    const updatedSections = { ...currentSections };
    const currentSection = updatedSections[sectionKey];
    if (currentSection) {
      updatedSections[sectionKey] = {
        ...currentSection,
        fields: {
          ...currentSection.fields,
          [questionData.id]: newQuestion,
        },
      };
    }

    form.setValue('sections', updatedSections);
  };

  const editQuestion = (questionData: QuestionFormSchema) => {
    const currentSections = form.getValues('sections');
    if (!currentSections) {
      console.error('No sections found');
      return;
    }

    const sectionKey = Object.keys(currentSections).find(
      (key) => currentSections[key]?.id === questionData.sectionId
    );

    if (!sectionKey) {
      console.error('Section not found:', questionData.sectionId);
      return;
    }

    const updatedSections = { ...currentSections };
    const currentSection = updatedSections[sectionKey];

    if (currentSection && currentSection.fields) {
      const updatedFields = { ...currentSection.fields };
      updatedFields[questionData.id] = {
        id: questionData.id,
        sectionId: questionData.sectionId,
        type: questionData.type,
        label: questionData.label,
        description: questionData.description,
        helperText: questionData.helperText,
        required: questionData.required,
        order: questionData.order,
        attributes: questionData.attributes || {},
      };

      updatedSections[sectionKey] = {
        ...currentSection,
        fields: updatedFields,
      };
    }

    form.setValue('sections', updatedSections);
  };

  const deleteQuestion = (questionId: string, sectionId: string) => {
    const currentSections = form.getValues('sections');
    if (!currentSections) {
      console.error('No sections found');
      return;
    }

    const sectionKey = Object.keys(currentSections).find(
      (key) => currentSections[key]?.id === sectionId
    );

    if (!sectionKey) {
      console.error('Section not found:', sectionId);
      return;
    }

    const updatedSections = { ...currentSections };
    const currentSection = updatedSections[sectionKey];

    if (currentSection && currentSection.fields) {
      const updatedFields = { ...currentSection.fields };
      delete updatedFields[questionId];

      updatedSections[sectionKey] = {
        ...currentSection,
        fields: updatedFields,
      };
    }

    form.setValue('sections', updatedSections);
  };

  const addSection = () => {
    const currentSections = form.getValues('sections');
    const sectionId = uuidv4();
    const newSection: SectionQuestionSchema = {
      id: sectionId,
      title: `Section #${Object.keys(currentSections).length + 1}`,
      description: '',
      fields: {},
      order: Object.keys(currentSections).length,
      showInfo: true,
    };

    const updatedSections = { ...currentSections, [sectionId]: newSection };
    form.setValue('sections', updatedSections);
  };

  const editSection = (sectionData: SectionFormSchema) => {
    const currentSections = form.getValues('sections');
    if (!currentSections) {
      console.error('No sections found');
      return;
    }

    const sectionKey = Object.keys(currentSections).find(
      (key) => currentSections[key]?.id === sectionData.id
    );

    if (!sectionKey) {
      console.error('Section not found:', sectionData.id);
      return;
    }

    const updatedSections = { ...currentSections };
    updatedSections[sectionKey] = sectionData;
    form.setValue('sections', updatedSections);
  };

  const deleteSection = (sectionId: string) => {
    const currentSections = form.getValues('sections');
    if (!currentSections) {
      console.error('No sections found');
      return;
    }

    const sectionKey = Object.keys(currentSections).find(
      (key) => currentSections[key]?.id === sectionId
    );

    if (!sectionKey) {
      console.error('Section not found:', sectionId);
      return;
    }

    const updatedSections = { ...currentSections };
    delete updatedSections[sectionKey];
    form.setValue('sections', updatedSections);
  };

  const onSubmit = (data: FormBuilderSchema) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Form created successfully');
        router.push(PRIVATE_ROUTES.forms.list);
      },
      onError: () => {
        toast.error('Failed to create form');
      },
    });
  };

  return {
    form,
    isPending,
    addQuestion,
    editQuestion,
    deleteQuestion,
    addSection,
    editSection,
    deleteSection,
    onSubmit,
  };
};

export default useFormNewActions;
