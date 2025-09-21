import { type ICheckboxAttributes } from '@repo/form-ui/schemas/checkbox';
import { type IDateAttributes } from '@repo/form-ui/schemas/date';
import { type IEmailAttributes } from '@repo/form-ui/schemas/email';
import { type INumberFieldAttributes } from '@repo/form-ui/schemas/number';
import { type ISelectAttributes } from '@repo/form-ui/schemas/select';
import { type ITextFieldAttributes } from '@repo/form-ui/schemas/text';
import { type ITextareaAttributes } from '@repo/form-ui/schemas/textarea';

export type IFieldAttributes =
  | ICheckboxAttributes
  | IDateAttributes
  | IEmailAttributes
  | INumberFieldAttributes
  | ISelectAttributes
  | ITextareaAttributes
  | ITextFieldAttributes;

export type FieldType =
  | 'checkbox'
  | 'date'
  | 'email'
  | 'number'
  | 'select'
  | 'text'
  | 'textarea';

export interface IForm {
  id: string;
  title: string;
  description: string;
  sections: ISection[];
  isActive?: boolean;
  multiPage?: boolean;
  allowDrafts?: boolean;
  requireAuth?: boolean;
  submitMessage?: string;
  redirectUrl?: string;
  createdAt: number;
  updatedAt: number;
}

export interface ISection {
  id: string;
  title: string;
  description: string;
  fields: IField<IFieldAttributes>[];
  order: number;
  showInfo: boolean;
}

export interface IField<T extends IFieldAttributes = IFieldAttributes> {
  id: string;
  sectionId: string;
  type: FieldType;
  label: string;
  helperText?: string;
  required: boolean;
  order: number;
  attributes: T;
}
