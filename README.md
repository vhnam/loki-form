# Loki Form Builder

A modern, section-based form builder application built with Next.js 15 and TypeScript, organized as a Turborepo monorepo. Create dynamic forms with multiple field types, organized sections, comprehensive question management, and real-time form building capabilities. The application features a complete authentication system, multi-language support, and a robust backend API built with NestJS.

## What's inside?

This Turborepo includes the following packages/apps:

### Applications

- **`form-builder`**: Main form builder application built with Next.js 15 with App Router
- **`form-builder-server`**: NestJS API server for form builder backend services

### Packages

- **`@repo/core-ui`**: Design system and reusable UI components (React library)
- **`@repo/form-ui`**: Form-specific UI components and logic (depends on core-ui)
- **`api-spec`**: TypeSpec API specification and OpenAPI documentation
- **`@repo/eslint-config`**: Shared ESLint configurations
- **`@repo/typescript-config`**: Shared TypeScript configurations
- **`@repo/prettier-config`**: Shared Prettier configuration

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/) with strict mode enabled.

## Features

### Form Building (✅ Implemented)

- **Section-based Architecture**: Organize questions into collapsible sections with custom titles and descriptions
- **Multiple Field Types**: Text, email, select, checkbox, date, textarea, and number fields with type-specific badges
- **Interactive Question Management**: Add, edit, and delete questions with real-time form state updates
- **Collapsible Section Interface**: Expandable/collapsible sections with intuitive toggle controls
- **Form Configuration**: Set form properties like title, description, multi-page mode, and submission settings
- **Real-time Form Builder**: Interactive form creation with live state management and validation
- **Question Attributes**: Customize field behavior with placeholders, default values, helper text, and validation rules
- **Section Management**: Add, edit, and delete sections with automatic ordering and field preservation
- **Form State Management**: Comprehensive form state handling with React Hook Form and Zod validation

### User Management (✅ Implemented)

- **Authentication**: Secure JWT-based authentication with access and refresh tokens
- **User Registration**: Sign up with first name, last name, email, and password
- **User Login**: Sign in with email and password
- **Password Recovery**: Forgot password functionality with email reset
- **Profile Management**: User profile with interface mode preferences
- **Multi-language Support**: English and Vietnamese interface with locale-aware field ordering
- **Theme Support**: Light, dark, and system theme modes with user preference storage

### Technical Features (✅ Implemented)

- **Responsive Design**: Mobile-first design that works seamlessly across all devices
- **Type Safety**: End-to-end TypeScript with strict mode and comprehensive type definitions
- **API Documentation**: Auto-generated OpenAPI 3.0 documentation with TypeSpec
- **Database Management**: PostgreSQL with Drizzle ORM, migrations, and database studio
- **Error Handling**: Comprehensive error boundaries, form validation, and user feedback
- **State Management**: Zustand for client state and React Query for server state
- **Form Handling**: React Hook Form with Zod validation for optimal performance

## Supported Field Types (✅ Currently Implemented)

The form builder currently supports the following field types:

### Available Field Types

- **Text Fields**: Single-line text input with custom placeholder and default values
- **Email Fields**: Email input with built-in email validation and custom attributes
- **Textarea**: Multi-line text input with configurable rows and character limits
- **Number Fields**: Numeric input with min/max validation and step controls
- **Date Fields**: Date picker with single date selection and custom date ranges
- **Select Fields**: Dropdown selection with single or multiple options and custom option labels
- **Checkbox Fields**: Multiple selection with custom validation rules and option management

### Field Configuration Options

Each field type supports:

- **Required/Optional Validation**: Mark fields as required with visual badges and validation messages
- **Custom Placeholder Text**: Set helpful placeholder text for better user experience
- **Default Values**: Pre-populate fields with default values
- **Helper Text**: Add descriptive text to guide users
- **Custom Attributes**: Field-specific configuration (min/max values, character limits, etc.)
- **Order Management**: Control the display order of fields within sections
- **Type-specific Badges**: Visual indicators showing field types (text, email, select, etc.)
- **Section Organization**: Fields are organized within collapsible sections for better structure
- **Accessibility Features**: Proper labeling and ARIA attributes for screen readers

### Form Builder Interface (✅ Implemented)

The form builder provides an intuitive interface for creating and managing forms:

- **Section-based Layout**: Forms are organized into collapsible sections for better structure
- **Interactive Section Management**: Add, edit, and delete sections with automatic numbering
- **Question Management**: Add questions to sections with dedicated dialog interfaces
- **Real-time State Updates**: Form state is updated immediately when adding, editing, or deleting questions
- **Visual Question Display**: Questions are displayed with type badges, labels, and required/optional indicators
- **Section Collapse/Expand**: Sections can be collapsed or expanded for better organization
- **Form Header Actions**: Save and cancel actions with proper navigation and loading states
- **Empty State Handling**: Clear messaging when sections have no questions

### Planned Field Types (🚧 Coming Soon)

- **Password Fields**: Secure password input with strength validation
- **Radio Buttons**: Single selection from multiple options
- **File Upload**: File input with type and size restrictions
- **Conditional Logic**: Show/hide fields based on other field values

## Architecture & Design Principles

### Monorepo Structure

This project follows a well-organized monorepo pattern with clear separation of concerns:

- **Applications**: Standalone apps that can be deployed independently
- **Packages**: Reusable libraries shared across applications
- **Shared Configurations**: Consistent tooling and standards across all packages

### Design System

- **Component Library**: Reusable UI components built with Radix UI primitives
- **Design Tokens**: Consistent spacing, colors, and typography
- **Accessibility**: WCAG compliant components with proper ARIA attributes
- **Theming**: Support for light/dark modes with system preference detection

### Development Workflow

- **Type Safety**: End-to-end TypeScript with strict mode
- **Code Quality**: ESLint, Prettier, and automated testing
- **Build Optimization**: Turbo for fast, cached builds
- **Hot Reloading**: Instant feedback during development

## Technology Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.9.2 (strict mode)
- **Styling**: TailwindCSS v4, Radix UI components
- **State Management**: React Query (TanStack Query), Zustand
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Shadcn UI, Radix UI primitives
- **Icons**: Lucide React
- **Theming**: next-themes
- **Internationalization**: next-intl
- **Notifications**: Sonner
- **Error Handling**: react-error-boundary
- **HTTP Client**: Axios

### Backend

- **Framework**: NestJS 10
- **Language**: TypeScript 5.9.2
- **Database**: PostgreSQL with Drizzle ORM 0.44.5
- **Authentication**: JWT with Passport.js
- **Validation**: class-validator, class-transformer, Zod
- **Password Hashing**: bcrypt
- **API Documentation**: TypeSpec with OpenAPI 3.0

### API Specification

- **Specification**: TypeSpec (Microsoft's TypeSpec)
- **Output**: OpenAPI 3.0
- **Tools**: TypeSpec compiler, TypeSpec HTTP, TypeSpec REST
- **Visualization**: Scalar

### Development Tools

- **Package Manager**: pnpm 9.0.0
- **Build Tool**: Turborepo 2.5.6
- **Node Version**: >=22
- **Linting**: ESLint 9 with TypeScript ESLint
- **Formatting**: Prettier 3.6.2
- **Testing**: Vitest (form-ui), Jest (server)
- **Type Checking**: TypeScript 5.9.2

### Database & ORM

- **Database**: PostgreSQL
- **ORM**: Drizzle ORM 0.44.5
- **Migrations**: Drizzle Kit
- **Studio**: Drizzle Studio for database GUI

### UI Libraries & Components

- **Base Components**: Radix UI primitives
- **Design System**: Shadcn UI
- **Styling**: TailwindCSS v4 with PostCSS
- **Animations**: tw-animate-css
- **Date Picker**: react-day-picker
- **Utilities**: class-variance-authority, clsx, tailwind-merge

## Getting Started

### Prerequisites

- Node.js >= 22
- pnpm 9.0.0

### Installation

```sh
# Install dependencies
pnpm install
```

### Quick Start

```sh
# Start all development servers (frontend + backend)
pnpm dev

# Or start specific services:
# Frontend only (runs on http://localhost:3000)
pnpm dev --filter=form-builder

# Backend only (runs on http://localhost:4000)
pnpm dev --filter=form-builder-server

# Open your browser to http://localhost:3000
# Start building forms!
```

## Development

### Build

To build all apps and packages:

```sh
pnpm build
```

To build a specific package:

```sh
# Build form-builder app
pnpm build --filter=form-builder

# Build core-ui package
pnpm build --filter=@repo/core-ui

# Build form-ui package
pnpm build --filter=@repo/form-ui
```

### Development Server

To start all development servers:

```sh
pnpm dev
```

To start a specific app:

```sh
# Start form-builder app (runs on http://localhost:3000)
pnpm dev --filter=form-builder

# Start form-builder-server (runs on http://localhost:4000)
pnpm dev --filter=form-builder-server
```

### Linting and Type Checking

```sh
# Lint all packages
pnpm lint

# Check types across all packages
pnpm check-types

# Format code
pnpm format
```

## Project Structure

```
loki-form/
├── apps/
│   ├── form-builder/          # Main form builder application (Next.js)
│   └── form-builder-server/   # Backend API server (NestJS)
├── packages/
│   ├── core-ui/              # Design system components
│   ├── form-ui/              # Form-specific components
│   ├── api-spec/             # TypeSpec API specification
│   ├── eslint-config/        # Shared ESLint configs
│   ├── typescript-config/    # Shared TypeScript configs
│   └── prettier-config/      # Shared Prettier config
├── package.json              # Root package.json
├── pnpm-workspace.yaml       # pnpm workspace config
└── turbo.json                # Turborepo config
```

## Package Dependencies

- **form-builder** → `@repo/core-ui`, `@repo/form-ui`
- **form-builder-server** → (standalone NestJS application)
- **form-ui** → `@repo/core-ui`
- **core-ui** → (no internal dependencies)
- **api-spec** → (standalone TypeSpec specification)

## API Documentation

The project includes a TypeSpec API specification that generates OpenAPI documentation:

```sh
# Generate API documentation
pnpm --filter=api-spec preview

# View documentation at http://localhost:1234
```

## API Endpoints (✅ Currently Implemented)

The backend provides a comprehensive REST API with the following implemented endpoints:

### Authentication (✅ Implemented)

- `POST /auth/register` - User registration with email and password
- `POST /auth/login` - User login with JWT token generation
- `POST /auth/refresh` - Refresh access token using refresh token
- `POST /auth/logout` - User logout and token invalidation
- `GET /auth/profile` - Get authenticated user profile
- `PUT /auth/profile` - Update user profile information
- `POST /auth/change-password` - Change user password
- `POST /auth/forgot-password` - Request password reset via email
- `POST /auth/reset-password` - Reset password with verification token

### Forms (✅ Implemented)

- `GET /forms` - List user forms with pagination support
- `POST /forms` - Create new form with basic configuration
- `POST /forms/complete` - Create complete form with sections and fields
- `GET /forms/:id` - Get detailed form information
- `PUT /forms/:id` - Update form configuration
- `DELETE /forms/:id` - Delete form and all associated data
- `GET /forms/:id/sections` - Get form sections
- `POST /forms/:id/sections` - Add new section to form
- `PUT /forms/:id/sections/:sectionId` - Update section details
- `DELETE /forms/:id/sections/:sectionId` - Delete section and its fields
- `GET /forms/:id/sections/:sectionId/fields` - Get section fields
- `POST /forms/:id/sections/:sectionId/fields` - Add new field to section
- `PUT /forms/:id/sections/:sectionId/fields/:fieldId` - Update field configuration
- `DELETE /forms/:id/sections/:sectionId/fields/:fieldId` - Delete field from section

### Users (✅ Implemented)

- `GET /users` - List users (admin only)
- `GET /users/:id` - Get user details
- `PUT /users/:id` - Update user information
- `DELETE /users/:id` - Delete user account

### Health Check (✅ Implemented)

- `GET /health` - API health status and system information

### API Features

- **JWT Authentication**: All form endpoints require valid JWT tokens
- **Request Validation**: Comprehensive input validation using class-validator
- **Error Handling**: Structured error responses with proper HTTP status codes
- **Pagination**: Built-in pagination support for list endpoints
- **Type Safety**: Full TypeScript support with auto-generated DTOs
- **OpenAPI Documentation**: Auto-generated API documentation with TypeSpec

All endpoints are documented with OpenAPI 3.0 specification and can be explored using the interactive API documentation at `/api/docs` when the server is running.

## Database Setup

The backend uses PostgreSQL with Drizzle ORM:

```sh
# Generate database migrations
pnpm --filter=form-builder-server db:generate

# Run migrations
pnpm --filter=form-builder-server db:migrate

# Open Drizzle Studio (database GUI)
pnpm --filter=form-builder-server db:studio
```

## Environment Configuration

### Frontend Environment Variables

Create a `.env.local` file in the `apps/form-builder` directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Internationalization
NEXT_PUBLIC_DEFAULT_LOCALE=en-US
NEXT_PUBLIC_SUPPORTED_LOCALES=en-US,vi-VN
```

### Backend Environment Variables

Create a `.env` file in the `apps/form-builder-server` directory:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/form_builder

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_REFRESH_EXPIRES_IN=7d

# Application
PORT=4000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Database Configuration

The application uses PostgreSQL with the following default configuration:

- **Host**: localhost
- **Port**: 5432
- **Database**: form_builder
- **SSL**: Disabled for development

## Remote Caching

This project uses Turborepo's remote caching for faster builds. To enable remote caching:

```sh
# Login to Vercel (if you have an account)
npx turbo login

# Link your repository to remote cache
npx turbo link
```

## Contributing

1. Make sure you have the prerequisites installed
2. Install dependencies: `pnpm install`
3. Start development servers: `pnpm dev`
4. Make your changes
5. Run linting and type checking: `pnpm lint && pnpm check-types`
6. Format your code: `pnpm format`

## Useful Links

### Core Technologies

- [Turborepo Documentation](https://turborepo.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com/)
- [pnpm Documentation](https://pnpm.io/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### UI & Styling

- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com/)
- [React Hook Form Documentation](https://react-hook-form.com/)

### Database & API

- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [TypeSpec Documentation](https://typespec.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### Development Tools

- [React Query Documentation](https://tanstack.com/query/latest)
- [Zod Documentation](https://zod.dev/)
- [Vitest Documentation](https://vitest.dev/)
