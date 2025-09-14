import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateFormDto {
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
}
