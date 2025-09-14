import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import type { FieldType } from '../../database/schema/forms';

export class CreateFieldDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  label: string;

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
  attributes?: Record<string, any>;
}
