# Data Model: Modern Section-Based Form Builder

**Feature**: 001-build-a-modern  
**Date**: 2025-01-27  
**Source**: OpenAPI 1.0 specification and feature requirements

## Core Entities

### User

**Purpose**: Represents form creators and end users with authentication and profile management

**Fields**:

- `id` (UUID, Primary Key): Unique identifier for the user
- `firstName` (string, 1-255 chars): User's first name
- `lastName` (string, 1-255 chars): User's last name
- `email` (string, 1-255 chars): Email address for authentication
- `password` (string, hashed): Encrypted password
- `role` (enum: user|admin|superadmin): User role for access control
- `interfaceMode` (enum: light|dark|system): UI theme preference
- `interfaceLanguage` (enum: en-US|vi-VN): UI language preference
- `isActive` (boolean): Account status
- `createdAt` (timestamp): Account creation date
- `updatedAt` (timestamp): Last profile update

**Validation Rules**:

- Email must be unique across all users
- Password must meet security requirements (8+ chars, mixed case, numbers, symbols)
- Role is read-only and set during account creation
- Interface preferences have default values

**State Transitions**:

- `inactive` → `active`: Account activation
- `active` → `inactive`: Account deactivation
- `user` → `admin`: Role elevation (admin only)

### Form

**Purpose**: Represents a complete form definition with metadata and configuration

**Fields**:

- `id` (UUID, Primary Key): Unique identifier for the form
- `title` (string, 1-255 chars): Form title displayed to users
- `description` (string, 0-255 chars): Form description or instructions
- `userId` (UUID, Foreign Key): ID of the user who created this form
- `isActive` (boolean): Whether form accepts submissions
- `version` (integer): Version number for change tracking
- `multiPage` (boolean): Whether form spans multiple pages
- `allowDrafts` (boolean): Whether users can save drafts
- `requireAuth` (boolean): Whether authentication required for submission
- `submitMessage` (string): Success message after submission
- `redirectUrl` (string, optional): URL to redirect after submission
- `publicUrl` (string, optional): Public URL for published forms
- `createdAt` (timestamp): Form creation date
- `updatedAt` (timestamp): Last modification date
- `publishedAt` (timestamp, optional): Publication date

**Validation Rules**:

- Title is required and cannot be empty
- Description is optional but limited to 255 characters
- Version auto-increments on each save
- Public URL is generated only when form is published
- User can only modify their own forms

**State Transitions**:

- `draft` → `published`: Form publication
- `published` → `draft`: Form unpublishing
- `active` → `inactive`: Form deactivation
- `inactive` → `active`: Form reactivation

### Section

**Purpose**: Represents a logical grouping of questions within a form

**Fields**:

- `id` (UUID, Primary Key): Unique identifier for the section
- `formId` (UUID, Foreign Key): ID of the parent form
- `title` (string, 1-255 chars): Section title displayed to users
- `description` (string, 0-255 chars): Section description or instructions
- `order` (integer): Display order within the form
- `isRequired` (boolean): Whether section must be completed
- `createdAt` (timestamp): Section creation date
- `updatedAt` (timestamp): Last modification date

**Validation Rules**:

- Title is required and cannot be empty
- Order must be unique within a form
- Description is optional but limited to 255 characters
- Section belongs to exactly one form

**State Transitions**:

- `draft` → `active`: Section activation
- `active` → `draft`: Section deactivation

### Question (Field)

**Purpose**: Represents individual form input fields with type-specific configuration

**Fields**:

- `id` (UUID, Primary Key): Unique identifier for the field
- `sectionId` (UUID, Foreign Key): ID of the parent section
- `type` (enum: text|textarea|email|checkbox|select|date|number): Field type
- `label` (string): Display label for the field
- `required` (boolean): Whether field is required for submission
- `helperText` (string, optional): Helper text to guide users
- `order` (integer): Display order within the section
- `attributes` (JSON): Type-specific configuration and validation rules
- `createdAt` (timestamp): Field creation date
- `updatedAt` (timestamp): Last modification date

**Validation Rules**:

- Label is required and cannot be empty
- Order must be unique within a section
- Attributes must match the field type requirements
- Field belongs to exactly one section

**Type-Specific Attributes**:

#### TextFieldAttributes

- `placeholder` (string): Placeholder text
- `minLength` (integer): Minimum character count
- `maxLength` (integer): Maximum character count
- `defaultValue` (string): Default field value

#### EmailFieldAttributes

- `placeholder` (string): Placeholder text
- `minLength` (integer): Minimum character count
- `maxLength` (integer): Maximum character count
- `defaultValue` (string): Default email value

#### TextareaFieldAttributes

- `placeholder` (string): Placeholder text
- `minLength` (integer): Minimum character count
- `maxLength` (integer): Maximum character count
- `defaultValue` (string): Default field value
- `rows` (integer): Number of visible text lines

#### NumberFieldAttributes

- `placeholder` (string): Placeholder text
- `min` (integer): Minimum numeric value
- `max` (integer): Maximum numeric value
- `defaultValue` (integer): Default numeric value

#### DateFieldAttributes

- `placeholder` (string): Placeholder text
- `beforeDate` (integer): Unix timestamp - dates before this are not selectable
- `afterDate` (integer): Unix timestamp - dates after this are not selectable
- `defaultValue` (string): Default date value
- `dateFormat` (string): Date format for display (e.g., 'MM/DD/YYYY')
- `mode` (enum: single|multiple|range): Date selection mode

#### SelectFieldAttributes

- `options` (array of SelectOption): Available selection options
- `minSelected` (integer): Minimum number of selections required
- `maxSelected` (integer): Maximum number of selections allowed
- `placeholder` (string): Placeholder text when no option selected
- `defaultValue` (string): Default selected value
- `multiple` (boolean): Whether multiple selections allowed
- `searchable` (boolean): Whether field supports search/filtering

#### CheckboxFieldAttributes

- `options` (string): Comma-separated list of checkbox options
- `minSelected` (integer): Minimum number of options that must be selected
- `maxSelected` (integer): Maximum number of options that can be selected

### SelectOption

**Purpose**: Represents individual options within select fields

**Fields**:

- `label` (string): Display text for the option
- `value` (string): Value submitted when option is selected
- `disabled` (boolean): Whether option is disabled

**Validation Rules**:

- Label and value are required
- Value must be unique within the select field

### FormSubmission

**Purpose**: Represents completed form data submitted by end users

**Fields**:

- `id` (UUID, Primary Key): Unique identifier for the submission
- `formId` (UUID, Foreign Key): ID of the submitted form
- `userId` (UUID, Foreign Key, optional): ID of submitting user (if authenticated)
- `data` (JSON): Submitted form data with field values
- `status` (enum: draft|submitted): Submission status
- `submittedAt` (timestamp): Submission completion date
- `createdAt` (timestamp): Draft creation date
- `updatedAt` (timestamp): Last modification date

**Validation Rules**:

- Data must match form field requirements
- Required fields must be present for submitted status
- User ID is optional for anonymous submissions
- Submission belongs to exactly one form

**State Transitions**:

- `draft` → `submitted`: Form submission completion
- `submitted` → `draft`: Submission reversion (if allowed)

### UserSession

**Purpose**: Represents authenticated user sessions for access control

**Fields**:

- `id` (UUID, Primary Key): Unique identifier for the session
- `userId` (UUID, Foreign Key): ID of the authenticated user
- `accessToken` (string): JWT access token
- `refreshToken` (string): JWT refresh token
- `expiresAt` (timestamp): Session expiration date
- `createdAt` (timestamp): Session creation date
- `lastAccessedAt` (timestamp): Last activity timestamp

**Validation Rules**:

- Access token expires after 15 minutes
- Refresh token expires after 7 days
- Session is automatically cleaned up after expiration
- One active session per user (or multiple if allowed)

## Relationships

### Primary Relationships

- **User** → **Form** (1:N): One user can create many forms
- **Form** → **Section** (1:N): One form can have many sections
- **Section** → **Question** (1:N): One section can have many questions
- **Form** → **FormSubmission** (1:N): One form can have many submissions
- **User** → **FormSubmission** (1:N): One user can make many submissions
- **User** → **UserSession** (1:N): One user can have multiple sessions

### Referential Integrity

- Cascade delete: Deleting a form deletes all sections, questions, and submissions
- Restrict delete: Cannot delete user if they have forms or submissions
- Set null: Deleting a user sets userId to null in submissions (for anonymous data)

## Indexes and Performance

### Primary Indexes

- All primary keys (id fields) are automatically indexed
- Foreign keys (userId, formId, sectionId) are indexed for join performance

### Composite Indexes

- `(formId, order)` on Section table for ordered section retrieval
- `(sectionId, order)` on Question table for ordered field retrieval
- `(formId, submittedAt)` on FormSubmission table for submission history
- `(userId, createdAt)` on Form table for user's form listing

### Query Optimization

- JSON fields (attributes, data) use PostgreSQL JSON operators for efficient querying
- Pagination indexes for large result sets
- Partial indexes for active/inactive status filtering

## Data Validation

### Application-Level Validation

- Zod schemas for runtime type validation
- Business rule validation in service layer
- Input sanitization for XSS prevention

### Database-Level Validation

- NOT NULL constraints for required fields
- CHECK constraints for enum values
- UNIQUE constraints for email addresses
- Foreign key constraints for referential integrity

## Security Considerations

### Data Protection

- Password hashing with bcrypt
- JWT token encryption
- Input sanitization for all user data
- SQL injection prevention via ORM

### Access Control

- Row-level security for user data isolation
- Role-based access control for admin functions
- Form ownership validation for modifications
- Public form access without authentication

### Privacy Compliance

- GDPR-compliant data handling
- Data anonymization for analytics
- User data export and deletion capabilities
- Audit logging for sensitive operations
