import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import {
  type FormBuilderSchema,
  type QuestionFormDialogSchema,
  formBuilderSchema,
} from '@/schemas/form';

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
          order: 0,
          showInfo: true,
        },
      ],
    },
  });

  const addQuestion = (questionData: QuestionFormDialogSchema) => {
    const currentSections = form.getValues('sections');
    const sectionIndex = currentSections.findIndex(
      (section) => section.id === questionData.sectionId
    );

    if (sectionIndex === -1) {
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

    const updatedSections = [...currentSections];
    const currentSection = updatedSections[sectionIndex];
    if (currentSection) {
      updatedSections[sectionIndex] = {
        ...currentSection,
        fields: [...(currentSection.fields || []), newQuestion],
      };
    }

    form.setValue('sections', updatedSections);
  };

  const editQuestion = (questionData: QuestionFormDialogSchema) => {
    const currentSections = form.getValues('sections');
    const sectionIndex = currentSections.findIndex(
      (section) => section.id === questionData.sectionId
    );

    if (sectionIndex === -1) {
      console.error('Section not found:', questionData.sectionId);
      return;
    }

    const updatedSections = [...currentSections];
    const currentSection = updatedSections[sectionIndex];

    if (currentSection) {
      const fieldIndex = currentSection.fields?.findIndex(
        (field) => field.id === questionData.id
      );

      if (
        fieldIndex !== undefined &&
        fieldIndex !== -1 &&
        currentSection.fields
      ) {
        const updatedFields = [...currentSection.fields];
        updatedFields[fieldIndex] = {
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

        updatedSections[sectionIndex] = {
          ...currentSection,
          fields: updatedFields,
        };
      }
    }

    form.setValue('sections', updatedSections);
  };

  const deleteQuestion = (questionId: string, sectionId: string) => {
    const currentSections = form.getValues('sections');
    const sectionIndex = currentSections.findIndex(
      (section) => section.id === sectionId
    );

    if (sectionIndex === -1) {
      console.error('Section not found:', sectionId);
      return;
    }

    const updatedSections = [...currentSections];
    const currentSection = updatedSections[sectionIndex];

    if (currentSection && currentSection.fields) {
      const updatedFields = currentSection.fields.filter(
        (field) => field.id !== questionId
      );

      updatedSections[sectionIndex] = {
        ...currentSection,
        fields: updatedFields,
      };
    }

    form.setValue('sections', updatedSections);
  };

  return { form, addQuestion, editQuestion, deleteQuestion };
};

export default useFormNewActions;
