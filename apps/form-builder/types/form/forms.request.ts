import type { FieldType, IFieldAttributes } from '@repo/form-ui/types/form';

export interface CreateCompleteFormRequest {
  title: string;
  description?: string;
  isActive?: boolean;
  multiPage?: boolean;
  allowDrafts?: boolean;
  requireAuth?: boolean;
  submitMessage?: string;
  redirectUrl?: string;
  sections: CreateCompleteSectionRequest[];
}

export interface CreateCompleteSectionRequest {
  id: string;
  order: number;
  showInfo: boolean;
  title: string;
  description?: string;
  fields: CreateCompleteFieldRequest[];
}

export interface CreateCompleteFieldRequest {
  id: string;
  label: string;
  description?: string;
  helperText?: string;
  sectionId: string;
  type: FieldType;
  required?: boolean;
  order?: number;
  attributes?: IFieldAttributes;
}
