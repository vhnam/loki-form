# Implementation Plan: Modern Section-Based Form Builder

**Branch**: `001-build-a-modern` | **Date**: 2025-01-27 | **Spec**: `/specs/001-build-a-modern/spec.md`
**Input**: Feature specification from `/specs/001-build-a-modern/spec.md`

## Execution Flow (/plan command scope)

```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code or `AGENTS.md` for opencode).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:

- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary

Build a modern, section-based form builder application with Next.js 15 and TypeScript in a Turborepo monorepo. The application features drag-and-drop form creation, multiple field types, real-time preview, user authentication, and a comprehensive backend API built with NestJS.

## Technical Context

**Language/Version**: TypeScript 5.9.2 (strict mode)  
**Primary Dependencies**: Next.js 15, NestJS 10+, React 19+, TailwindCSS v4, Drizzle ORM, PostgreSQL  
**Storage**: PostgreSQL with Drizzle ORM  
**Testing**: Vitest (frontend), Jest (backend), React Testing Library  
**Target Platform**: Web application (browser-based)  
**Project Type**: web (frontend + backend)  
**Performance Goals**: FCP < 1.5s, LCP < 2.5s, API p95 < 200ms, DB p95 < 50ms  
**Constraints**: Bundle size < 250KB per route, Memory < 512MB per instance, 1000+ concurrent users  
**Scale/Scope**: Multi-tenant form builder with user authentication and form management

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Type Safety Compliance

- [x] All new code uses TypeScript with strict mode
- [x] Runtime validation with Zod schemas for external data
- [x] No JavaScript files in production code
- [x] Complete type definitions for all interfaces

### Monorepo Architecture Compliance

- [x] Package dependencies follow core-ui → form-ui → applications hierarchy
- [x] No circular dependencies introduced
- [x] Shared configurations centralized
- [x] Each package independently buildable

### Component Development Compliance

- [x] UI components built in core-ui first, then specialized
- [x] WCAG accessibility compliance
- [x] Theme support (light/dark modes)
- [x] Stable component APIs

### Testing Compliance

- [ ] TDD approach for business logic
- [ ] Integration tests for API endpoints and user flows
- [ ] Unit tests for utilities and validation
- [ ] Test coverage > 80% for critical paths

### Performance Compliance

- [ ] Frontend: FCP < 1.5s, LCP < 2.5s, CLS < 0.1
- [ ] Backend: API p95 < 200ms, DB p95 < 50ms
- [ ] Bundle size < 250KB per route
- [ ] Memory usage < 512MB per instance

### Security Compliance

- [x] JWT authentication with proper expiration
- [x] Input sanitization for all user data
- [x] HTTPS mandatory in production
- [x] No secrets in code or environment files

## Project Structure

### Documentation (this feature)

```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)

```
# Turborepo Monorepo Structure
apps/
├── form-builder/              # Next.js 15 frontend application
│   ├── app/                   # App Router pages and layouts
│   ├── components/            # Application-specific components
│   ├── modules/               # Feature-based modules
│   ├── layouts/               # Layout components
│   ├── hooks/                 # Custom React hooks
│   ├── services/              # API services and mutations
│   ├── schemas/               # Form validation schemas
│   ├── stores/                # Zustand state management
│   └── types/                 # TypeScript type definitions
└── form-builder-server/       # NestJS backend API
    ├── src/
    │   ├── auth/              # Authentication module
    │   ├── forms/             # Forms module
    │   ├── users/             # Users module
    │   ├── database/          # Database configuration
    │   └── health/            # Health check endpoints
    └── drizzle/               # Database migrations

packages/
├── core-ui/                   # Design system and UI components
├── form-ui/                   # Form-specific UI components
├── api-spec/                  # TypeSpec API specification
├── eslint-config/             # Shared ESLint configurations
├── typescript-config/         # Shared TypeScript configurations
└── prettier-config/           # Shared Prettier configuration
```

**Structure Decision**: Web application with Turborepo monorepo architecture

## Phase 0: Outline & Research

1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:

   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts

_Prerequisites: research.md complete_

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/bash/update-agent-context.sh cursor` for your AI assistant
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/\*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach

_This section describes what the /tasks command will do - DO NOT execute during /plan_

**Task Generation Strategy**:

- Load `.specify/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Each API endpoint → contract test task [P]
- Each entity → model creation task [P]
- Each user story → integration test task
- Implementation tasks to make tests pass

**Specific Task Categories**:

### Database & Models (Foundation Layer)

- [P] Create User model with authentication fields
- [P] Create Form model with metadata and configuration
- [P] Create Section model with ordering and relationships
- [P] Create Question model with type-specific attributes
- [P] Create FormSubmission model with JSON data storage
- [P] Create UserSession model for JWT management
- [P] Set up database migrations with Drizzle ORM
- [P] Create database indexes for performance optimization

### API Contracts & Tests (Service Layer)

- [P] Auth endpoints contract tests (register, login, profile, refresh)
- [P] Form CRUD endpoints contract tests
- [P] Form submission endpoints contract tests
- [P] Health check endpoints contract tests
- [P] Pagination and filtering contract tests
- [P] Error handling contract tests (validation, unauthorized, not found)

### Backend Implementation (NestJS)

- [P] Authentication module with JWT strategy
- [P] Users module with profile management
- [P] Forms module with CRUD operations
- [P] Form submissions module with data handling
- [P] Health check module for monitoring
- [P] Database service with Drizzle integration
- [P] Validation pipes with Zod schemas
- [P] Error handling and logging middleware

### Frontend Implementation (Next.js 15)

- [P] Authentication pages (sign-in, sign-up, forgot-password)
- [P] Dashboard layout with navigation
- [P] Form list and management interface
- [P] Form builder with drag-and-drop functionality
- [P] Form preview and real-time validation
- [P] Form submission interface for end users
- [P] User profile and settings management
- [P] Multi-language support with next-intl

### UI Components (Design System)

- [P] Core UI components in packages/core-ui
- [P] Form-specific components in packages/form-ui
- [P] Field type components (text, email, select, etc.)
- [P] Form builder components (sections, questions, preview)
- [P] Authentication components (forms, modals)
- [P] Dashboard components (tables, charts, navigation)
- [P] Responsive design and accessibility features
- [P] Theme support (light/dark modes)

### Integration & E2E Tests

- [P] User registration and authentication flow
- [P] Form creation and editing workflow
- [P] Form publishing and public access
- [P] Form submission and data collection
- [P] Multi-language interface testing
- [P] Real-time collaboration testing
- [P] Performance and load testing
- [P] Security and validation testing

**Ordering Strategy**:

- TDD order: Tests before implementation
- Dependency order: Models → Services → UI → Integration
- Mark [P] for parallel execution (independent files)
- Critical path: Database → API → Frontend → Testing

**Estimated Output**: 35-40 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation

_These phases are beyond the scope of the /plan command_

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking

_Fill ONLY if Constitution Check has violations that must be justified_

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |

## Progress Tracking

_This checklist is updated during execution flow_

**Phase Status**:

- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [x] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:

- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented

---

_Based on Constitution v1.0.0 - See `.specify/memory/constitution.md`_
