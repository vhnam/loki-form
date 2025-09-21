import type { IFieldAttributes } from '@repo/form-ui/types/form';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

import type { FieldType } from '../../database/schema/forms';

export class CreateFieldDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  label: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsNotEmpty()
  @IsUUID()
  sectionId: string;

  @IsNotEmpty()
  @IsEnum(['text', 'textarea', 'email', 'checkbox', 'select', 'date', 'number'])
  type: FieldType;

  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  helperText?: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  attributes?: IFieldAttributes;
}
