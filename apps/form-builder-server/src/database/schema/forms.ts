import {
  boolean,
  integer,
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// Enums
export const fieldTypeEnum = pgEnum('field_type', [
  'text',
  'textarea',
  'email',
  'checkbox',
  'select',
  'date',
  'number',
]);

export const dateModeEnum = pgEnum('date_mode', [
  'single',
  'multiple',
  'range',
]);

// Forms table
export const forms = pgTable('forms', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }).default('').notNull(),
  userId: uuid('user_id').notNull(), // Foreign key to users table
  isActive: boolean('is_active').default(true).notNull(),
  version: integer('version').default(1).notNull(),
  multiPage: boolean('multi_page').default(false).notNull(),
  allowDrafts: boolean('allow_drafts').default(false).notNull(),
  requireAuth: boolean('require_auth').default(false).notNull(),
  submitMessage: text('submit_message')
    .default('Thank you for your submission!')
    .notNull(),
  redirectUrl: varchar('redirect_url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Sections table
export const sections = pgTable('sections', {
  id: uuid('id').primaryKey().defaultRandom(),
  formId: uuid('form_id').notNull(), // Foreign key to forms table
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }).default('').notNull(),
  order: integer('order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Fields table
export const fields = pgTable('fields', {
  id: uuid('id').primaryKey().defaultRandom(),
  sectionId: uuid('section_id').notNull(), // Foreign key to sections table
  type: fieldTypeEnum('type').notNull(),
  label: varchar('label', { length: 255 }).notNull(),
  required: boolean('required').default(false).notNull(),
  helperText: varchar('helper_text', { length: 500 }),
  order: integer('order').default(0).notNull(),
  // Store field-specific attributes as JSON
  attributes: json('attributes')
    .$type<Record<string, any>>()
    .default({})
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Zod schemas for validation
export const insertFormSchema = createInsertSchema(forms);
export const selectFormSchema = createSelectSchema(forms);

export const insertSectionSchema = createInsertSchema(sections);
export const selectSectionSchema = createSelectSchema(sections);

export const insertFieldSchema = createInsertSchema(fields);
export const selectFieldSchema = createSelectSchema(fields);

// Type exports
export type Form = typeof forms.$inferSelect;
export type NewForm = typeof forms.$inferInsert;

export type Section = typeof sections.$inferSelect;
export type NewSection = typeof sections.$inferInsert;

export type Field = typeof fields.$inferSelect;
export type NewField = typeof fields.$inferInsert;

export type FieldType = (typeof fieldTypeEnum.enumValues)[number];
export type DateMode = (typeof dateModeEnum.enumValues)[number];
