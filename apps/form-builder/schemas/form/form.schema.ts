import { z } from 'zod';

export const conditionalLogicSchema = z.object({
  action: z.enum(['visible', 'hidden', 'jumped']).optional(),
  targetSection: z.string().optional(),
});

export const selectOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disabled: z.boolean().optional(),
  conditionalLogic: conditionalLogicSchema.optional(),
});

export const questionFormDialogSchema = z.object({
  id: z.uuidv4(),
  label: z.string().min(1).max(255),
  description: z.string().max(255).optional(),
  sectionId: z.string().min(1).max(255),
  type: z.string().min(1).max(255),
  helperText: z.string().max(255).optional(),
  required: z.boolean(),
  order: z.number(),
  attributes: z
    .object({
      options: z.array(selectOptionSchema).optional(),
      minSelected: z.number().optional(),
      maxSelected: z.number().optional(),
      minLength: z.number().optional(),
      maxLength: z.number().optional(),
      min: z.number().optional(),
      max: z.number().optional(),
      step: z.number().optional(),
      placeholder: z.string().optional(),
      pattern: z.string().optional(),
      defaultValue: z.string().optional(),
    })
    .optional(),
});

export const formBuilderSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  isActive: z.boolean(),
  version: z.number(),
  multiPage: z.boolean(),
  allowDrafts: z.boolean(),
  requireAuth: z.boolean(),
  submitMessage: z.string().min(1).max(255),
  redirectUrl: z.string().min(1).max(255),
  sections: z.array(
    z.object({
      id: z.uuidv4(),
      title: z.string().min(1).max(255),
      description: z.string().min(1).max(255),
      fields: z.array(questionFormDialogSchema),
      order: z.number(),
      showInfo: z.boolean(),
    })
  ),
});

export type FormBuilderSchema = z.infer<typeof formBuilderSchema>;
export type QuestionFormDialogSchema = z.infer<typeof questionFormDialogSchema>;
