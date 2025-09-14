import { z } from 'zod';

export const selectOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disabled: z.boolean().optional(),
});

export const selectFieldAttributesSchema = z.object({
  options: z.array(selectOptionSchema),
  placeholder: z.string().optional(),
  defaultValue: z.string().optional(),
  minSelected: z.number().optional(),
  maxSelected: z.number().optional(),
});

export type ISelectAttributes = z.infer<typeof selectFieldAttributesSchema>;
export type ISelectOptionAttributes = z.infer<typeof selectOptionSchema>;
