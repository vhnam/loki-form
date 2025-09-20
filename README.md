# Loki Form Builder

A modern, form builder application built with Next.js and TypeScript, organized as a Turborepo monorepo. Create dynamic forms with various field types, conditional logic, and real-time preview capabilities.

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

### Form Building

- **Multiple Field Types**: Text, email, select, checkbox, date, textarea, number, password, radio, and file fields
- **Conditional Logic**: Create dynamic forms with conditional field visibility
- **Real-time Preview**: See your form as you build it with live updates
- **Form Management**: Create, edit, delete, and organize your forms
- **Drag & Drop Interface**: Intuitive form builder with drag-and-drop functionality
- **Form Validation**: Built-in validation with Zod schemas

### User Management

- **Authentication**: Secure JWT-based authentication with refresh tokens
- **User Registration**: Sign up with email and password
- **Profile Management**: Update user profile and preferences
- **Password Management**: Change password, forgot password, and reset password
- **Multi-language Support**: English and Vietnamese interface
- **Theme Support**: Light, dark, and system theme modes

### Technical Features

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Type Safety**: Full TypeScript support with strict mode
- **API Documentation**: Auto-generated OpenAPI 3.0 documentation
- **Database Management**: PostgreSQL with Drizzle ORM and migrations
- **Error Handling**: Comprehensive error boundaries and user feedback

## Supported Field Types

The form builder supports a comprehensive set of field types:

- **Text Fields**: Single-line text input with validation
- **Email Fields**: Email input with built-in email validation
- **Textarea**: Multi-line text input for longer content
- **Number Fields**: Numeric input with min/max validation
- **Password Fields**: Secure password input
- **Date Fields**: Date picker with customizable date ranges
- **Select Fields**: Dropdown selection with single or multiple options
- **Radio Buttons**: Single selection from multiple options
- **Checkboxes**: Multiple selection with custom validation rules
- **File Upload**: File input with type and size restrictions

Each field type supports:

- Required/optional validation
- Custom placeholder text
- Default values
- Conditional logic rules
- Custom validation messages
- Accessibility features

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

## API Endpoints

The backend provides a comprehensive REST API with the following main endpoints:

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - User logout
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update user profile
- `POST /auth/change-password` - Change password
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token

### Forms (Coming Soon)

- `GET /forms` - List user forms
- `POST /forms` - Create new form
- `GET /forms/:id` - Get form details
- `PUT /forms/:id` - Update form
- `DELETE /forms/:id` - Delete form
- `POST /forms/:id/submit` - Submit form response

### Health Check

- `GET /health` - API health status

All endpoints are documented with OpenAPI 3.0 specification and can be explored using the interactive API documentation.

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
