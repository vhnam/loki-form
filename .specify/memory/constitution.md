<!--
Sync Impact Report:
Version change: N/A → 1.0.0
Modified principles: N/A (initial creation)
Added sections: Type Safety, Monorepo Architecture, User Experience, Performance Standards, Security Requirements, Development Workflow
Removed sections: N/A
Templates requiring updates: ✅ plan-template.md (Constitution Check section), ✅ spec-template.md (no changes needed), ✅ tasks-template.md (no changes needed), ✅ agent-file-template.md (no changes needed)
Follow-up TODOs: None
-->

# Form Builder Constitution

## Core Principles

### I. Type Safety First (NON-NEGOTIABLE)

All code MUST be written in TypeScript with strict mode enabled. No JavaScript files
allowed in production code. Type definitions MUST be complete and accurate. Runtime
type validation required for all external data using Zod schemas. Type safety
supersedes development speed - if it can't be typed properly, the approach is wrong.

### II. Monorepo Architecture

Package dependencies MUST follow clear hierarchy: core-ui → form-ui → applications.
No circular dependencies allowed. Each package MUST be independently buildable and
testable. Shared configurations (ESLint, TypeScript, Prettier) MUST be centralized.
Applications MUST depend on packages, never the reverse.

### III. Component-Driven Development

UI components MUST be built in packages/core-ui first, then specialized in
packages/form-ui. All components MUST be accessible (WCAG compliant) and support
theming (light/dark modes). Component APIs MUST be stable and well-documented.
Reusability over convenience - prefer composition over duplication.

### IV. Test-First Development (NON-NEGOTIABLE)

TDD mandatory for all business logic: Tests written → User approved → Tests fail →
Then implement. Red-Green-Refactor cycle strictly enforced. Integration tests
required for: API endpoints, form validation flows, user authentication, database
operations. Unit tests required for: utility functions, validation schemas, business
logic. Test coverage MUST exceed 80% for critical paths.

### V. User Experience Consistency

All user interactions MUST follow established patterns from the design system.
Loading states, error handling, and success feedback MUST be consistent across the
application. Internationalization (i18n) MUST be implemented for all user-facing
text. Responsive design MUST work on mobile and desktop. Performance MUST meet
Core Web Vitals standards.

## Technology Standards

### Frontend Requirements

- Next.js 15+ with App Router (mandatory)
- React 19+ with functional components and hooks
- TailwindCSS v4 for styling (no CSS-in-JS)
- Radix UI primitives for accessibility
- React Hook Form + Zod for form handling
- React Query for server state management
- Zustand for client state management

### Backend Requirements

- NestJS 10+ with TypeScript strict mode
- PostgreSQL with Drizzle ORM (no raw SQL in application code)
- JWT authentication with refresh tokens
- OpenAPI 3.0 documentation via TypeSpec
- bcrypt for password hashing
- class-validator for request validation

### Development Tools

- pnpm 9+ for package management
- Turborepo for build orchestration
- ESLint + Prettier for code quality
- Vitest for frontend testing, Jest for backend
- TypeScript 5.9+ with strict mode

## Performance Standards

### Frontend Performance

- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- First Input Delay < 100ms
- Bundle size per route < 250KB (gzipped)

### Backend Performance

- API response time p95 < 200ms
- Database query time p95 < 50ms
- Memory usage < 512MB per instance
- Support 1000+ concurrent users
- 99.9% uptime target

## Security Requirements

### Authentication & Authorization

- JWT tokens with secure expiration (15min access, 7d refresh)
- Password requirements: 8+ chars, mixed case, numbers, symbols
- Rate limiting on authentication endpoints
- CSRF protection on state-changing operations
- Input sanitization for all user data

### Data Protection

- All sensitive data MUST be encrypted at rest
- HTTPS mandatory in production
- No secrets in code or environment files
- Regular security dependency updates
- SQL injection prevention via ORM

## Development Workflow

### Code Quality Gates

- All PRs MUST pass TypeScript compilation
- All PRs MUST pass ESLint and Prettier checks
- All PRs MUST have passing tests
- All PRs MUST have code review approval
- No direct commits to main branch

### Testing Requirements

- Contract tests for all API endpoints
- Integration tests for user workflows
- Unit tests for business logic
- E2E tests for critical user journeys
- Performance tests for API endpoints

### Documentation Standards

- README files for all packages
- API documentation via TypeSpec
- Component documentation with examples
- Architecture decision records (ADRs)
- Deployment and setup guides

## Governance

This constitution supersedes all other development practices and coding standards.
Amendments require: (1) documented rationale, (2) team consensus, (3) migration plan
for existing code, (4) version increment following semantic versioning.

All code reviews MUST verify constitution compliance. Complexity deviations MUST be
justified with documented rationale. Use `.specify/memory/constitution.md` for
runtime development guidance.

**Version**: 1.0.0 | **Ratified**: 2025-01-27 | **Last Amended**: 2025-01-27
