import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import { PRIVATE_ROUTES } from '@/constants/routes';

import { pick } from '@repo/core-ui/lib/lodash';

import {
  type FormBuilderSchema,
  type QuestionFormSchema,
  type SectionFormSchema,
  type SectionQuestionSchema,
  formBuilderSchema,
} from '@/schemas/form';

import { CreateCompleteFormRequest } from '@/types/form/forms.request';

import { useCreateFormMutation } from '@/services/forms/forms.mutations';

const getDefaultFormValues = () => {
  const sectionId = uuidv4();
  return {
    title: 'Untitled',
    description: '',
    isActive: true,
    multiPage: false,
    allowDrafts: false,
    requireAuth: false,
    submitMessage: '',
    redirectUrl: '',
    sections: {
      [sectionId]: {
        id: sectionId,
        title: 'Section #1',
        description: '',
        fields: {},
        order: 0,
        showInfo: true,
      },
    },
  };
};

const useFormNewActions = () => {
  const router = useRouter();

  const { mutate, isPending } = useCreateFormMutation();

  const form = useForm<FormBuilderSchema>({
    resolver: zodResolver(formBuilderSchema),
    defaultValues: getDefaultFormValues(),
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

    const newQuestion = pick(questionData, [
      'id',
      'sectionId',
      'type',
      'label',
      'description',
      'helperText',
      'required',
      'order',
      'attributes',
    ]);

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
      updatedFields[questionData.id] = pick(questionData, [
        'id',
        'sectionId',
        'type',
        'label',
        'description',
        'helperText',
        'required',
        'order',
        'attributes',
      ]);

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
    const formattedData: CreateCompleteFormRequest = {
      ...data,
      sections: Object.values(data.sections).map((section) => ({
        ...section,
        order: section.order ?? 0,
        showInfo: section.showInfo ?? true,
        description: section.description || '',
        fields: Object.values(section.fields).map((field) => ({
          id: field.id,
          sectionId: field.sectionId,
          type: field.type,
          label: field.label,
          description: field.description,
          required: field.required ?? false,
          order: field.order ?? 0,
          helperText: field.helperText,
          attributes: field.attributes || {},
        })),
      })),
    };
    mutate(formattedData, {
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
