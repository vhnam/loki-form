import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import {
  type QuestionFormDialogSchema,
  questionFormDialogSchema,
} from '@/schemas/form';

import { type IField, IForm } from '@repo/form-ui/types/form';

const extractDefaultAttributes = (attributes: unknown) => {
  const attrs = attributes as Record<string, unknown>;
  return {
    options: Array.isArray(attrs?.options) ? attrs.options : [],
    minSelected:
      typeof attrs?.minSelected === 'number' ? attrs.minSelected : undefined,
    maxSelected:
      typeof attrs?.maxSelected === 'number' ? attrs.maxSelected : undefined,
    minLength:
      typeof attrs?.minLength === 'number' ? attrs.minLength : undefined,
    maxLength:
      typeof attrs?.maxLength === 'number' ? attrs.maxLength : undefined,
    min: typeof attrs?.min === 'number' ? attrs.min : undefined,
    max: typeof attrs?.max === 'number' ? attrs.max : undefined,
    step: typeof attrs?.step === 'number' ? attrs.step : undefined,
    placeholder:
      typeof attrs?.placeholder === 'string' ? attrs.placeholder : undefined,
    defaultValue:
      typeof attrs?.placeholder === 'string' ? attrs.placeholder : undefined,
    pattern: typeof attrs?.pattern === 'string' ? attrs.pattern : undefined,
  };
};

interface UseQuestionFormDialogActionsProps {
  form: IForm;
  question?: IField;
}

const useQuestionFormDialogActions = ({
  form,
  question,
}: UseQuestionFormDialogActionsProps) => {
  const uuid = uuidv4();

  const hookForm = useForm<QuestionFormDialogSchema>({
    resolver: zodResolver(questionFormDialogSchema),
    defaultValues: question
      ? {
          ...question,
          attributes: extractDefaultAttributes(question.attributes),
        }
      : {
          id: uuid,
          description: '',
          sectionId: form.sections[0]!.id,
          type: 'text',
          label: '',
          helperText: '',
          required: false,
          order: 0,
          attributes: {
            options: [],
            minSelected: undefined,
            maxSelected: undefined,
            minLength: undefined,
            maxLength: undefined,
            min: undefined,
            max: undefined,
            step: undefined,
            placeholder: '',
            defaultValue: '',
            pattern: undefined,
          },
        },
  });

  // Reset form when question changes (for editing)
  useEffect(() => {
    if (question) {
      hookForm.reset({
        ...question,
        attributes: extractDefaultAttributes(question.attributes),
      });
    }
  }, [question, hookForm]);

  return { hookForm };
};

export default useQuestionFormDialogActions;
