import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { and, asc, count, desc, eq, ilike, or, sql } from 'drizzle-orm';

import { DatabaseService } from '../database/database.service';
import {
  Field,
  Form,
  NewField,
  NewForm,
  NewSection,
  Section,
  fields,
  forms,
  sections,
} from '../database/schema/forms';
import {
  CreateCompleteFormDto,
  CreateFieldDto,
  CreateFormDto,
  CreateSectionDto,
  PaginatedResponse,
  PaginationDto,
  UpdateFormDto,
} from './dto';

@Injectable()
export class FormsService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Form CRUD operations
  async createForm(
    createFormDto: CreateFormDto,
    userId: string
  ): Promise<Form> {
    const newForm: NewForm = {
      ...createFormDto,
      userId,
      version: 1,
      description: createFormDto.description || '',
      isActive: createFormDto.isActive ?? true,
      multiPage: createFormDto.multiPage ?? false,
      allowDrafts: createFormDto.allowDrafts ?? false,
      requireAuth: createFormDto.requireAuth ?? false,
      submitMessage:
        createFormDto.submitMessage || 'Thank you for your submission!',
    };

    const result = await this.databaseService.db
      .insert(forms)
      .values(newForm)
      .returning();

    return result[0];
  }

  async findAllForms(
    userId?: string,
    pagination?: PaginationDto
  ): Promise<PaginatedResponse<Form>> {
    const page = pagination?.page || 1;
    const perPage = pagination?.perPage || 10;
    const offset = (page - 1) * perPage;

    // Determine sort order
    const sortOrder = pagination?.sortOrder === 'asc' ? asc : desc;
    const sortColumn =
      pagination?.sortBy === 'title'
        ? forms.title
        : pagination?.sortBy === 'updatedAt'
          ? forms.updatedAt
          : forms.createdAt;

    // Build base query conditions
    const conditions: any[] = [];
    if (userId) {
      conditions.push(eq(forms.userId, userId));
    }

    // Add search functionality if query is provided
    if (pagination?.query) {
      conditions.push(
        or(
          ilike(forms.title, `%${pagination.query}%`),
          ilike(forms.description, `%${pagination.query}%`)
        )
      );
    }

    // Get total count
    const totalCountResult = await this.databaseService.db
      .select({ count: count() })
      .from(forms)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    const total = totalCountResult[0]?.count || 0;

    // Get paginated results
    const query = this.databaseService.db
      .select()
      .from(forms)
      .orderBy(sortOrder(sortColumn))
      .limit(perPage)
      .offset(offset);

    if (conditions.length > 0) {
      query.where(and(...conditions));
    }

    const data = await query;

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / perPage);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      data,
      pagination: {
        page,
        perPage,
        total,
        totalPages,
        hasNext,
        hasPrev,
      },
    };
  }

  async findOneForm(id: string, userId?: string): Promise<Form> {
    const conditions = [eq(forms.id, id)];
    if (userId) {
      conditions.push(eq(forms.userId, userId));
    }

    const result = await this.databaseService.db
      .select()
      .from(forms)
      .where(and(...conditions))
      .limit(1);

    if (!result[0]) {
      throw new NotFoundException(`Form with ID ${id} not found`);
    }

    return result[0];
  }

  async updateForm(
    id: string,
    updateFormDto: UpdateFormDto,
    userId: string
  ): Promise<Form> {
    // First check if form exists and belongs to user
    await this.findOneForm(id, userId);

    const result = await this.databaseService.db
      .update(forms)
      .set({
        ...updateFormDto,
        updatedAt: new Date(),
      })
      .where(and(eq(forms.id, id), eq(forms.userId, userId)))
      .returning();

    return result[0];
  }

  async removeForm(id: string, userId: string): Promise<void> {
    // First check if form exists and belongs to user
    await this.findOneForm(id, userId);

    // Delete all related sections and fields first
    await this.databaseService.db
      .delete(fields)
      .where(
        eq(
          fields.sectionId,
          this.databaseService.db
            .select({ id: sections.id })
            .from(sections)
            .where(eq(sections.formId, id))
        )
      );

    await this.databaseService.db
      .delete(sections)
      .where(eq(sections.formId, id));

    // Finally delete the form
    await this.databaseService.db
      .delete(forms)
      .where(and(eq(forms.id, id), eq(forms.userId, userId)));
  }

  // Section CRUD operations
  async createSection(
    formId: string,
    createSectionDto: CreateSectionDto,
    userId: string
  ): Promise<Section> {
    // Verify form ownership
    await this.findOneForm(formId, userId);

    const newSection: NewSection = {
      ...createSectionDto,
      formId,
      description: createSectionDto.description || '',
      order: createSectionDto.order || 0,
    };

    const result = await this.databaseService.db
      .insert(sections)
      .values(newSection)
      .returning();

    return result[0];
  }

  async findSectionsByFormId(
    formId: string,
    userId?: string
  ): Promise<Section[]> {
    // Verify form ownership if userId provided
    if (userId) {
      await this.findOneForm(formId, userId);
    }

    return await this.databaseService.db
      .select()
      .from(sections)
      .where(eq(sections.formId, formId))
      .orderBy(sections.order);
  }

  async findOneSection(id: string, userId?: string): Promise<Section> {
    const result = await this.databaseService.db
      .select()
      .from(sections)
      .where(eq(sections.id, id))
      .limit(1);

    if (!result[0]) {
      throw new NotFoundException(`Section with ID ${id} not found`);
    }

    // If userId provided, verify form ownership
    if (userId) {
      await this.findOneForm(result[0].formId, userId);
    }

    return result[0];
  }

  async updateSection(
    id: string,
    updateSectionDto: Partial<CreateSectionDto>,
    userId: string
  ): Promise<Section> {
    // Verify section ownership through form
    const section = await this.findOneSection(id, userId);

    const result = await this.databaseService.db
      .update(sections)
      .set({
        ...updateSectionDto,
        updatedAt: new Date(),
      })
      .where(eq(sections.id, id))
      .returning();

    return result[0];
  }

  async removeSection(id: string, userId: string): Promise<void> {
    // Verify section ownership through form
    await this.findOneSection(id, userId);

    // Delete all related fields first
    await this.databaseService.db
      .delete(fields)
      .where(eq(fields.sectionId, id));

    // Delete the section
    await this.databaseService.db.delete(sections).where(eq(sections.id, id));
  }

  // Field CRUD operations
  async createField(
    sectionId: string,
    createFieldDto: CreateFieldDto,
    userId: string
  ): Promise<Field> {
    // Verify section ownership through form
    const section = await this.findOneSection(sectionId, userId);

    const newField: NewField = {
      ...createFieldDto,
      sectionId,
      required: createFieldDto.required ?? false,
      order: createFieldDto.order || 0,
      attributes: createFieldDto.attributes || {},
    };

    const result = await this.databaseService.db
      .insert(fields)
      .values(newField)
      .returning();

    return result[0];
  }

  async findFieldsBySectionId(
    sectionId: string,
    userId?: string
  ): Promise<Field[]> {
    // Verify section ownership if userId provided
    if (userId) {
      await this.findOneSection(sectionId, userId);
    }

    return await this.databaseService.db
      .select()
      .from(fields)
      .where(eq(fields.sectionId, sectionId))
      .orderBy(fields.order);
  }

  async findOneField(id: string, userId?: string): Promise<Field> {
    const result = await this.databaseService.db
      .select()
      .from(fields)
      .where(eq(fields.id, id))
      .limit(1);

    if (!result[0]) {
      throw new NotFoundException(`Field with ID ${id} not found`);
    }

    // If userId provided, verify ownership through section and form
    if (userId) {
      await this.findOneSection(result[0].sectionId, userId);
    }

    return result[0];
  }

  async updateField(
    id: string,
    updateFieldDto: Partial<CreateFieldDto>,
    userId: string
  ): Promise<Field> {
    // Verify field ownership through section and form
    await this.findOneField(id, userId);

    const result = await this.databaseService.db
      .update(fields)
      .set({
        ...updateFieldDto,
        updatedAt: new Date(),
      })
      .where(eq(fields.id, id))
      .returning();

    return result[0];
  }

  async removeField(id: string, userId: string): Promise<void> {
    // Verify field ownership through section and form
    await this.findOneField(id, userId);

    await this.databaseService.db.delete(fields).where(eq(fields.id, id));
  }

  // Get complete form with sections and fields
  async findFormWithDetails(
    id: string,
    userId?: string
  ): Promise<Form & { sections: (Section & { fields: Field[] })[] }> {
    const form = await this.findOneForm(id, userId);
    const sections = await this.findSectionsByFormId(id, userId);

    const sectionsWithFields = await Promise.all(
      sections.map(async (section) => {
        const sectionFields = await this.findFieldsBySectionId(
          section.id,
          userId
        );
        return { ...section, fields: sectionFields };
      })
    );

    return { ...form, sections: sectionsWithFields };
  }

  // Create complete form with sections and fields in one transaction
  async createCompleteForm(
    createCompleteFormDto: CreateCompleteFormDto,
    userId: string
  ): Promise<Form & { sections: (Section & { fields: Field[] })[] }> {
    return await this.databaseService.db.transaction(async (tx) => {
      // Create the form first
      const newForm: NewForm = {
        title: createCompleteFormDto.title,
        description: createCompleteFormDto.description || '',
        userId,
        version: 1,
        isActive: createCompleteFormDto.isActive ?? true,
        multiPage: createCompleteFormDto.multiPage ?? false,
        allowDrafts: createCompleteFormDto.allowDrafts ?? false,
        requireAuth: createCompleteFormDto.requireAuth ?? false,
        submitMessage:
          createCompleteFormDto.submitMessage ||
          'Thank you for your submission!',
        redirectUrl: createCompleteFormDto.redirectUrl,
      };

      const [createdForm] = await tx.insert(forms).values(newForm).returning();

      // Create sections and fields
      const sectionsWithFields = await Promise.all(
        createCompleteFormDto.sections.map(async (sectionDto, sectionIndex) => {
          const newSection: NewSection = {
            formId: createdForm.id,
            title: sectionDto.title,
            description: sectionDto.description || '',
            order: sectionDto.order ?? sectionIndex,
          };

          const [createdSection] = await tx
            .insert(sections)
            .values(newSection)
            .returning();

          // Create fields for this section
          const createdFields = await Promise.all(
            sectionDto.fields.map(async (fieldDto, fieldIndex) => {
              const newField: NewField = {
                sectionId: createdSection.id,
                label: fieldDto.label,
                type: fieldDto.type,
                required: fieldDto.required ?? false,
                helperText: fieldDto.helperText,
                order: fieldDto.order ?? fieldIndex,
                attributes: fieldDto.attributes || {},
              };

              const [createdField] = await tx
                .insert(fields)
                .values(newField)
                .returning();

              return createdField;
            })
          );

          return { ...createdSection, fields: createdFields };
        })
      );

      return { ...createdForm, sections: sectionsWithFields };
    });
  }
}
