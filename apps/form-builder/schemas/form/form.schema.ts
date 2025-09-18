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
  id: z.string(),
  label: z.string().min(1).max(255),
  description: z.string().max(255).optional(),
  sectionId: z.string().min(1).max(255),
  type: z.enum([
    'text',
    'textarea',
    'email',
    'checkbox',
    'select',
    'date',
    'number',
  ]),
  helperText: z.string().max(500).optional(),
  required: z.boolean().optional(),
  order: z.number().optional(),
  attributes: z.record(z.string(), z.any()).optional(),
});

export const sectionFormDialogSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(255),
  description: z.string().max(255).optional(),
  fields: z.array(questionFormDialogSchema),
  order: z.number().optional(),
  showInfo: z.boolean(),
});

export const formBuilderSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(255).optional(),
  isActive: z.boolean().optional(),
  multiPage: z.boolean().optional(),
  allowDrafts: z.boolean().optional(),
  requireAuth: z.boolean().optional(),
  submitMessage: z.string().optional(),
  redirectUrl: z.string().max(500).optional(),
  sections: z.array(sectionFormDialogSchema),
});

export type FormBuilderSchema = z.infer<typeof formBuilderSchema>;
export type SectionFormDialogSchema = z.infer<typeof sectionFormDialogSchema>;
export type SectionQuestionDialogSchema = SectionFormDialogSchema; // Alias for backward compatibility
export type QuestionFormDialogSchema = z.infer<typeof questionFormDialogSchema>;
