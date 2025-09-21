import { z } from 'zod';

export const numberFieldAttributesSchema = z.object({
  placeholder: z.string().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  defaultValue: z.number().optional(),
});

export type INumberFieldAttributes = z.infer<
  typeof numberFieldAttributesSchema
>;
