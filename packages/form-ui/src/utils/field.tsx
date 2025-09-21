import { QuestionType } from '@repo/form-ui/enums/question';

import { z } from 'zod';

import type { IField, IFieldAttributes } from '@repo/form-ui/types/form';

import { type ICheckboxAttributes } from '@repo/form-ui/schemas/checkbox';
import { type IDateAttributes } from '@repo/form-ui/schemas/date';
import { type IEmailAttributes } from '@repo/form-ui/schemas/email';
import { type INumberFieldAttributes } from '@repo/form-ui/schemas/number';
import { type ISelectAttributes } from '@repo/form-ui/schemas/select';
import { type ITextFieldAttributes } from '@repo/form-ui/schemas/text';
import { type ITextareaAttributes } from '@repo/form-ui/schemas/textarea';

import { pick } from '@repo/core-ui/lib/lodash';

import FormCheckbox from '@repo/form-ui/components/form-checkbox';
import FormDate from '@repo/form-ui/components/form-date';
import FormEmail from '@repo/form-ui/components/form-email';
import FormSelect from '@repo/form-ui/components/form-select';
import FormText from '@repo/form-ui/components/form-text';
import FormTextarea from '@repo/form-ui/components/form-textarea';

export const getFieldComponent = (field: IField<IFieldAttributes>) => {
  switch (field.type) {
    case 'checkbox':
      return <FormCheckbox {...(field as IField<ICheckboxAttributes>)} />;
    case 'date':
      return <FormDate {...(field as IField<IDateAttributes>)} />;
    case 'email':
      return <FormEmail {...(field as IField<IEmailAttributes>)} />;
    case 'select':
      return <FormSelect {...(field as IField<ISelectAttributes>)} />;
    case 'text':
      return <FormText {...(field as IField<ITextFieldAttributes>)} />;
    case 'textarea':
      return <FormTextarea {...(field as IField<ITextareaAttributes>)} />;
    default:
      return null;
  }
};

export const getFieldAttributes = <T extends IFieldAttributes>(
  fieldAttributesSchema: z.ZodSchema<T>,
  field: IField<IFieldAttributes>
) => {
  const result = fieldAttributesSchema.safeParse(field.attributes);
  if (!result.success) {
    console.warn('Invalid attributes provided', {
      attributes: field.attributes,
      errors: z.treeifyError(result.error),
    });
    return null;
  }
  return result;
};

export const extractAttributes = (
  questionType: QuestionType,
  attributes: IFieldAttributes
) => {
  switch (questionType) {
    case QuestionType.TEXT:
      return pick(attributes, [
        'placeholder',
        'minLength',
        'maxLength',
        'defaultValue',
      ]) as ITextFieldAttributes;
    case QuestionType.TEXTAREA:
      return pick(attributes, [
        'placeholder',
        'minLength',
        'maxLength',
        'defaultValue',
      ]) as ITextareaAttributes;
    case QuestionType.EMAIL:
      return pick(attributes, [
        'placeholder',
        'minLength',
        'maxLength',
        'defaultValue',
      ]) as IEmailAttributes;
    case QuestionType.NUMBER:
      return pick(attributes, [
        'placeholder',
        'min',
        'max',
        'defaultValue',
      ]) as INumberFieldAttributes;
    case QuestionType.CHECKBOX:
      return pick(attributes, [
        'options',
        'minSelected',
        'maxSelected',
      ]) as ICheckboxAttributes;
    case QuestionType.SELECT:
      return pick(attributes, [
        'options',
        'placeholder',
        'defaultValue',
        'minSelected',
        'maxSelected',
      ]) as ISelectAttributes;
    default:
      return null;
  }
};
