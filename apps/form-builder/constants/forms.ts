import type {
  FieldType,
  IField,
  IFieldAttributes,
  ISection,
} from '@repo/form-ui/types/form';

interface GenerateCreateFormValuesProps {
  questionId: string;
  section: ISection;
}

interface GenerateEditFormValuesProps {
  question: IField;
}

export const generateCreateFormValues = ({
  questionId,
  section,
}: GenerateCreateFormValuesProps) => {
  return {
    id: questionId,
    description: '',
    sectionId: section.id,
    type: 'text' as FieldType,
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
      beforeDate: undefined,
      afterDate: undefined,
      mode: 'single',
      dateFormat: 'MM/DD/YYYY',
    },
  } as IField<IFieldAttributes>;
};

export const generateEditFormValues = ({
  question,
}: GenerateEditFormValuesProps) => {
  return {
    ...question,
    type: question.type as
      | 'text'
      | 'textarea'
      | 'email'
      | 'checkbox'
      | 'select'
      | 'date'
      | 'number',
    attributes: question.attributes || {},
  } as IField<IFieldAttributes>;
};
