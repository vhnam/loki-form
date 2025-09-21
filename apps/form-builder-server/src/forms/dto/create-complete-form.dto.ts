import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { CreateFieldDto } from './create-field.dto';
import { CreateSectionDto } from './create-section.dto';

export class CreateCompleteFormDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  multiPage?: boolean;

  @IsOptional()
  @IsBoolean()
  allowDrafts?: boolean;

  @IsOptional()
  @IsBoolean()
  requireAuth?: boolean;

  @IsOptional()
  @IsString()
  submitMessage?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  redirectUrl?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCompleteSectionDto)
  sections: CreateCompleteSectionDto[];
}

export class CreateCompleteSectionDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  order?: number;

  @IsOptional()
  @IsBoolean()
  showInfo?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFieldDto)
  fields: CreateFieldDto[];
}
