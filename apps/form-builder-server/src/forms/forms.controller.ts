import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CreateCompleteFormDto,
  CreateFieldDto,
  CreateFormDto,
  CreateSectionDto,
  PaginationDto,
  UpdateFormDto,
} from './dto';
import { FormsService } from './forms.service';

interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

@Controller('forms')
@UseGuards(JwtAuthGuard)
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  // Form endpoints
  @Post()
  createForm(
    @Body() createFormDto: CreateFormDto,
    @Request() req: RequestWithUser
  ) {
    return this.formsService.createForm(createFormDto, req.user.id);
  }

  @Post('complete')
  createCompleteForm(
    @Body() createCompleteFormDto: CreateCompleteFormDto,
    @Request() req: RequestWithUser
  ) {
    return this.formsService.createCompleteForm(
      createCompleteFormDto,
      req.user.id
    );
  }

  @Get()
  findAllForms(
    @Request() req: RequestWithUser,
    @Query('all') all?: string,
    @Query() pagination?: PaginationDto
  ) {
    // If 'all' query param is provided and user is admin, return all forms
    const userId =
      all === 'true' && req.user.role === 'admin' ? undefined : req.user.id;
    return this.formsService.findAllForms(userId, pagination);
  }

  @Get(':id')
  findOneForm(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.formsService.findOneForm(id, req.user.id);
  }

  @Get(':id/details')
  findFormWithDetails(
    @Param('id') id: string,
    @Request() req: RequestWithUser
  ) {
    return this.formsService.findFormWithDetails(id, req.user.id);
  }

  @Patch(':id')
  updateForm(
    @Param('id') id: string,
    @Body() updateFormDto: UpdateFormDto,
    @Request() req: RequestWithUser
  ) {
    return this.formsService.updateForm(id, updateFormDto, req.user.id);
  }

  @Delete(':id')
  removeForm(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.formsService.removeForm(id, req.user.id);
  }

  // Section endpoints
  @Post(':formId/sections')
  createSection(
    @Param('formId') formId: string,
    @Body() createSectionDto: CreateSectionDto,
    @Request() req: RequestWithUser
  ) {
    return this.formsService.createSection(
      formId,
      createSectionDto,
      req.user.id
    );
  }

  @Get(':formId/sections')
  findSectionsByFormId(
    @Param('formId') formId: string,
    @Request() req: RequestWithUser
  ) {
    return this.formsService.findSectionsByFormId(formId, req.user.id);
  }

  @Get('sections/:id')
  findOneSection(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.formsService.findOneSection(id, req.user.id);
  }

  @Patch('sections/:id')
  updateSection(
    @Param('id') id: string,
    @Body() updateSectionDto: Partial<CreateSectionDto>,
    @Request() req: RequestWithUser
  ) {
    return this.formsService.updateSection(id, updateSectionDto, req.user.id);
  }

  @Delete('sections/:id')
  removeSection(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.formsService.removeSection(id, req.user.id);
  }

  // Field endpoints
  @Post('sections/:sectionId/fields')
  createField(
    @Param('sectionId') sectionId: string,
    @Body() createFieldDto: CreateFieldDto,
    @Request() req: RequestWithUser
  ) {
    return this.formsService.createField(
      sectionId,
      createFieldDto,
      req.user.id
    );
  }

  @Get('sections/:sectionId/fields')
  findFieldsBySectionId(
    @Param('sectionId') sectionId: string,
    @Request() req: RequestWithUser
  ) {
    return this.formsService.findFieldsBySectionId(sectionId, req.user.id);
  }

  @Get('fields/:id')
  findOneField(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.formsService.findOneField(id, req.user.id);
  }

  @Patch('fields/:id')
  updateField(
    @Param('id') id: string,
    @Body() updateFieldDto: Partial<CreateFieldDto>,
    @Request() req: RequestWithUser
  ) {
    return this.formsService.updateField(id, updateFieldDto, req.user.id);
  }

  @Delete('fields/:id')
  removeField(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.formsService.removeField(id, req.user.id);
  }
}
