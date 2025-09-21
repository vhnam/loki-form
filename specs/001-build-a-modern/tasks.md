# Tasks: Modern Section-Based Form Builder

**Input**: Design documents from `/specs/001-build-a-modern/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)

```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `apps/form-builder/`, `apps/form-builder-server/`, `packages/`
- **Frontend**: Next.js 15 App Router structure
- **Backend**: NestJS modular structure
- **Shared**: Turborepo monorepo packages

## Phase 3.1: Setup

- [ ] T001 Create Turborepo monorepo structure with apps/ and packages/ directories
- [ ] T002 Initialize Next.js 15 frontend app in apps/form-builder with App Router
- [ ] T003 Initialize NestJS 10+ backend app in apps/form-builder-server
- [ ] T004 [P] Create core-ui package in packages/core-ui with TailwindCSS v4
- [ ] T005 [P] Create form-ui package in packages/form-ui with form-specific components
- [ ] T006 [P] Create api-spec package in packages/api-spec with TypeSpec
- [ ] T007 Configure pnpm workspace and Turborepo build orchestration
- [ ] T008 [P] Setup TypeScript strict mode configuration across all packages
- [ ] T009 [P] Configure ESLint and Prettier with shared configs
- [ ] T010 [P] Setup Vitest for frontend testing and Jest for backend testing
- [ ] T011 [P] Configure PostgreSQL database with Drizzle ORM
- [ ] T012 [P] Setup Redis for sessions and caching
- [ ] T013 [P] Configure environment variables and secrets management

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3

**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

### Contract Tests

- [ ] T014 [P] Contract test POST /api/v1/auth/signup in apps/form-builder-server/tests/contract/test_auth_signup.ts
- [ ] T015 [P] Contract test POST /api/v1/auth/signin in apps/form-builder-server/tests/contract/test_auth_signin.ts
- [ ] T016 [P] Contract test POST /api/v1/auth/refresh in apps/form-builder-server/tests/contract/test_auth_refresh.ts
- [ ] T017 [P] Contract test POST /api/v1/auth/forgot-password in apps/form-builder-server/tests/contract/test_auth_forgot_password.ts
- [ ] T018 [P] Contract test POST /api/v1/auth/reset-password in apps/form-builder-server/tests/contract/test_auth_reset_password.ts
- [ ] T019 [P] Contract test GET /api/v1/users/me in apps/form-builder-server/tests/contract/test_users_me_get.ts
- [ ] T020 [P] Contract test PUT /api/v1/users/me in apps/form-builder-server/tests/contract/test_users_me_put.ts
- [ ] T021 [P] Contract test GET /api/v1/forms in apps/form-builder-server/tests/contract/test_forms_list.ts
- [ ] T022 [P] Contract test POST /api/v1/forms in apps/form-builder-server/tests/contract/test_forms_create.ts
- [ ] T023 [P] Contract test GET /api/v1/forms/{formId} in apps/form-builder-server/tests/contract/test_forms_get.ts
- [ ] T024 [P] Contract test PUT /api/v1/forms/{formId} in apps/form-builder-server/tests/contract/test_forms_update.ts
- [ ] T025 [P] Contract test DELETE /api/v1/forms/{formId} in apps/form-builder-server/tests/contract/test_forms_delete.ts
- [ ] T026 [P] Contract test POST /api/v1/forms/{formId}/publish in apps/form-builder-server/tests/contract/test_forms_publish.ts
- [ ] T027 [P] Contract test POST /api/v1/forms/{formId}/duplicate in apps/form-builder-server/tests/contract/test_forms_duplicate.ts
- [ ] T028 [P] Contract test GET /api/v1/forms/{formId}/sections in apps/form-builder-server/tests/contract/test_sections_list.ts
- [ ] T029 [P] Contract test POST /api/v1/forms/{formId}/sections in apps/form-builder-server/tests/contract/test_sections_create.ts
- [ ] T030 [P] Contract test GET /api/v1/sections/{sectionId} in apps/form-builder-server/tests/contract/test_sections_get.ts
- [ ] T031 [P] Contract test PUT /api/v1/sections/{sectionId} in apps/form-builder-server/tests/contract/test_sections_update.ts
- [ ] T032 [P] Contract test DELETE /api/v1/sections/{sectionId} in apps/form-builder-server/tests/contract/test_sections_delete.ts
- [ ] T033 [P] Contract test GET /api/v1/sections/{sectionId}/questions in apps/form-builder-server/tests/contract/test_questions_list.ts
- [ ] T034 [P] Contract test POST /api/v1/sections/{sectionId}/questions in apps/form-builder-server/tests/contract/test_questions_create.ts
- [ ] T035 [P] Contract test GET /api/v1/questions/{questionId} in apps/form-builder-server/tests/contract/test_questions_get.ts
- [ ] T036 [P] Contract test PUT /api/v1/questions/{questionId} in apps/form-builder-server/tests/contract/test_questions_update.ts
- [ ] T037 [P] Contract test DELETE /api/v1/questions/{questionId} in apps/form-builder-server/tests/contract/test_questions_delete.ts
- [ ] T038 [P] Contract test POST /api/v1/forms/{formId}/submit in apps/form-builder-server/tests/contract/test_submissions_create.ts
- [ ] T039 [P] Contract test GET /api/v1/forms/{formId}/submissions in apps/form-builder-server/tests/contract/test_submissions_list.ts
- [ ] T040 [P] Contract test GET /api/v1/forms/{formId}/analytics in apps/form-builder-server/tests/contract/test_analytics_get.ts

### Integration Tests

- [ ] T041 [P] Integration test user registration flow in apps/form-builder-server/tests/integration/test_user_registration.ts
- [ ] T042 [P] Integration test authentication flow in apps/form-builder-server/tests/integration/test_authentication.ts
- [ ] T043 [P] Integration test form creation flow in apps/form-builder-server/tests/integration/test_form_creation.ts
- [ ] T044 [P] Integration test form submission flow in apps/form-builder-server/tests/integration/test_form_submission.ts
- [ ] T045 [P] Integration test form analytics flow in apps/form-builder-server/tests/integration/test_form_analytics.ts
- [ ] T046 [P] Integration test multi-language support in apps/form-builder-server/tests/integration/test_i18n.ts
- [ ] T047 [P] Integration test form versioning in apps/form-builder-server/tests/integration/test_form_versioning.ts
- [ ] T048 [P] Integration test real-time collaboration in apps/form-builder-server/tests/integration/test_collaboration.ts

### Frontend Integration Tests

- [ ] T049 [P] E2E test user registration in apps/form-builder/tests/e2e/test_user_registration.spec.ts
- [ ] T050 [P] E2E test form builder workflow in apps/form-builder/tests/e2e/test_form_builder.spec.ts
- [ ] T051 [P] E2E test form submission in apps/form-builder/tests/e2e/test_form_submission.spec.ts
- [ ] T052 [P] E2E test dashboard functionality in apps/form-builder/tests/e2e/test_dashboard.spec.ts

## Phase 3.3: Core Implementation (ONLY after tests are failing)

### Database Models

- [ ] T053 [P] User model in apps/form-builder-server/src/database/models/user.model.ts
- [ ] T054 [P] Form model in apps/form-builder-server/src/database/models/form.model.ts
- [ ] T055 [P] Section model in apps/form-builder-server/src/database/models/section.model.ts
- [ ] T056 [P] Question model in apps/form-builder-server/src/database/models/question.model.ts
- [ ] T057 [P] FormSubmission model in apps/form-builder-server/src/database/models/form-submission.model.ts
- [ ] T058 [P] FormSubmissionData model in apps/form-builder-server/src/database/models/form-submission-data.model.ts
- [ ] T059 [P] UserSession model in apps/form-builder-server/src/database/models/user-session.model.ts
- [ ] T060 Database migrations and schema setup in apps/form-builder-server/drizzle/
- [ ] T061 Database seeders for development data in apps/form-builder-server/src/database/seeders/

### Validation Schemas

- [ ] T062 [P] Auth validation schemas in apps/form-builder-server/src/auth/schemas/auth.schemas.ts
- [ ] T063 [P] User validation schemas in apps/form-builder-server/src/users/schemas/user.schemas.ts
- [ ] T064 [P] Form validation schemas in apps/form-builder-server/src/forms/schemas/form.schemas.ts
- [ ] T065 [P] Section validation schemas in apps/form-builder-server/src/forms/schemas/section.schemas.ts
- [ ] T066 [P] Question validation schemas in apps/form-builder-server/src/forms/schemas/question.schemas.ts
- [ ] T067 [P] Submission validation schemas in apps/form-builder-server/src/forms/schemas/submission.schemas.ts

### Core Services

- [ ] T068 [P] AuthService in apps/form-builder-server/src/auth/services/auth.service.ts
- [ ] T069 [P] UserService in apps/form-builder-server/src/users/services/user.service.ts
- [ ] T070 [P] FormService in apps/form-builder-server/src/forms/services/form.service.ts
- [ ] T071 [P] SectionService in apps/form-builder-server/src/forms/services/section.service.ts
- [ ] T072 [P] QuestionService in apps/form-builder-server/src/forms/services/question.service.ts
- [ ] T073 [P] SubmissionService in apps/form-builder-server/src/forms/services/submission.service.ts
- [ ] T074 [P] AnalyticsService in apps/form-builder-server/src/forms/services/analytics.service.ts
- [ ] T075 [P] EmailService in apps/form-builder-server/src/shared/services/email.service.ts
- [ ] T076 [P] FileUploadService in apps/form-builder-server/src/shared/services/file-upload.service.ts

### API Controllers

- [ ] T077 AuthController in apps/form-builder-server/src/auth/controllers/auth.controller.ts
- [ ] T078 UserController in apps/form-builder-server/src/users/controllers/user.controller.ts
- [ ] T079 FormController in apps/form-builder-server/src/forms/controllers/form.controller.ts
- [ ] T080 SectionController in apps/form-builder-server/src/forms/controllers/section.controller.ts
- [ ] T081 QuestionController in apps/form-builder-server/src/forms/controllers/question.controller.ts
- [ ] T082 SubmissionController in apps/form-builder-server/src/forms/controllers/submission.controller.ts
- [ ] T083 AnalyticsController in apps/form-builder-server/src/forms/controllers/analytics.controller.ts

### Frontend Core Components

- [ ] T084 [P] Auth components in apps/form-builder/components/auth/
- [ ] T085 [P] Dashboard components in apps/form-builder/components/dashboard/
- [ ] T086 [P] Form builder components in apps/form-builder/components/form-builder/
- [ ] T087 [P] Form preview components in apps/form-builder/components/form-preview/
- [ ] T088 [P] User profile components in apps/form-builder/components/user-profile/
- [ ] T089 [P] Shared UI components in packages/core-ui/src/components/
- [ ] T090 [P] Form-specific components in packages/form-ui/src/components/

### Frontend Services and Hooks

- [ ] T091 [P] API client setup in apps/form-builder/services/apiClient.ts
- [ ] T092 [P] Auth services in apps/form-builder/services/auth/
- [ ] T093 [P] Form services in apps/form-builder/services/forms/
- [ ] T094 [P] User services in apps/form-builder/services/users/
- [ ] T095 [P] Custom hooks in apps/form-builder/hooks/
- [ ] T096 [P] State management with Zustand in apps/form-builder/stores/

## Phase 3.4: Integration

### Backend Integration

- [ ] T097 Database connection and configuration in apps/form-builder-server/src/database/database.module.ts
- [ ] T098 JWT authentication middleware in apps/form-builder-server/src/auth/middleware/jwt-auth.middleware.ts
- [ ] T099 Request validation middleware in apps/form-builder-server/src/shared/middleware/validation.middleware.ts
- [ ] T100 Error handling middleware in apps/form-builder-server/src/shared/middleware/error.middleware.ts
- [ ] T101 Rate limiting middleware in apps/form-builder-server/src/shared/middleware/rate-limit.middleware.ts
- [ ] T102 CORS configuration in apps/form-builder-server/src/shared/config/cors.config.ts
- [ ] T103 Security headers configuration in apps/form-builder-server/src/shared/config/security.config.ts
- [ ] T104 Logging configuration in apps/form-builder-server/src/shared/config/logging.config.ts
- [ ] T105 Redis integration for sessions in apps/form-builder-server/src/shared/services/redis.service.ts
- [ ] T106 WebSocket gateway for real-time collaboration in apps/form-builder-server/src/forms/gateways/collaboration.gateway.ts

### Frontend Integration

- [ ] T107 Next.js middleware for authentication in apps/form-builder/middleware.ts
- [ ] T108 API route handlers in apps/form-builder/app/api/
- [ ] T109 React Query setup and configuration in apps/form-builder/providers/query.tsx
- [ ] T110 Theme provider setup in apps/form-builder/providers/theme.tsx
- [ ] T111 Internationalization setup with next-intl in apps/form-builder/i18n/
- [ ] T112 Error boundary implementation in apps/form-builder/components/error-boundary/
- [ ] T113 Loading states and error handling in apps/form-builder/components/ui/
- [ ] T114 Form validation with React Hook Form and Zod in apps/form-builder/schemas/

### Real-time Features

- [ ] T115 WebSocket client setup in apps/form-builder/services/websocket.ts
- [ ] T116 Real-time form collaboration in apps/form-builder/hooks/use-collaboration.ts
- [ ] T117 Optimistic updates for form editing in apps/form-builder/hooks/use-optimistic-updates.ts
- [ ] T118 Conflict resolution for concurrent edits in apps/form-builder/utils/conflict-resolution.ts

## Phase 3.5: Polish

### Testing and Quality

- [ ] T119 [P] Unit tests for validation schemas in apps/form-builder-server/tests/unit/test-validation.ts
- [ ] T120 [P] Unit tests for services in apps/form-builder-server/tests/unit/test-services.ts
- [ ] T121 [P] Unit tests for utilities in apps/form-builder/tests/unit/test-utils.ts
- [ ] T122 [P] Unit tests for hooks in apps/form-builder/tests/unit/test-hooks.ts
- [ ] T123 [P] Unit tests for components in packages/core-ui/tests/unit/test-components.ts
- [ ] T124 [P] Unit tests for form components in packages/form-ui/tests/unit/test-form-components.ts
- [ ] T125 Performance tests for API endpoints (<200ms p95)
- [ ] T126 Performance tests for frontend (FCP < 1.5s, LCP < 2.5s)
- [ ] T127 Load testing for concurrent users (1000+)
- [ ] T128 Security testing and vulnerability scanning

### Documentation and Deployment

- [ ] T129 [P] API documentation generation from TypeSpec in packages/api-spec/
- [ ] T130 [P] Component documentation in packages/core-ui/docs/
- [ ] T131 [P] Form component documentation in packages/form-ui/docs/
- [ ] T132 [P] README files for all packages
- [ ] T133 [P] Deployment configuration for Vercel (frontend)
- [ ] T134 [P] Deployment configuration for Railway/Render (backend)
- [ ] T135 [P] CI/CD pipeline with GitHub Actions
- [ ] T136 [P] Environment configuration for development, staging, production
- [ ] T137 [P] Database backup and migration strategies
- [ ] T138 [P] Monitoring and logging setup

### Final Validation

- [ ] T139 Run all contract tests and verify they pass
- [ ] T140 Run all integration tests and verify they pass
- [ ] T141 Run all E2E tests and verify they pass
- [ ] T142 Execute quickstart.md scenarios manually
- [ ] T143 Performance validation against benchmarks
- [ ] T144 Security validation and penetration testing
- [ ] T145 Accessibility testing (WCAG compliance)
- [ ] T146 Cross-browser compatibility testing
- [ ] T147 Mobile responsiveness testing
- [ ] T148 Code review and cleanup

## Dependencies

- Setup tasks (T001-T013) before all other tasks
- Test tasks (T014-T052) before implementation tasks (T053-T118)
- Model tasks (T053-T061) before service tasks (T068-T076)
- Service tasks before controller tasks (T077-T083)
- Backend tasks before frontend integration tasks (T107-T114)
- All implementation tasks before polish tasks (T119-T148)

## Parallel Execution Examples

### Phase 3.1 Setup (T004-T013 can run in parallel):

```
Task: "Create core-ui package in packages/core-ui with TailwindCSS v4"
Task: "Create form-ui package in packages/form-ui with form-specific components"
Task: "Create api-spec package in packages/api-spec with TypeSpec"
Task: "Setup TypeScript strict mode configuration across all packages"
Task: "Configure ESLint and Prettier with shared configs"
Task: "Setup Vitest for frontend testing and Jest for backend testing"
Task: "Configure PostgreSQL database with Drizzle ORM"
Task: "Setup Redis for sessions and caching"
Task: "Configure environment variables and secrets management"
```

### Phase 3.2 Contract Tests (T014-T040 can run in parallel):

```
Task: "Contract test POST /api/v1/auth/signup in apps/form-builder-server/tests/contract/test_auth_signup.ts"
Task: "Contract test POST /api/v1/auth/signin in apps/form-builder-server/tests/contract/test_auth_signin.ts"
Task: "Contract test GET /api/v1/users/me in apps/form-builder-server/tests/contract/test_users_me_get.ts"
Task: "Contract test POST /api/v1/forms in apps/form-builder-server/tests/contract/test_forms_create.ts"
Task: "Contract test GET /api/v1/forms/{formId} in apps/form-builder-server/tests/contract/test_forms_get.ts"
# ... (all contract tests can run in parallel)
```

### Phase 3.3 Models (T053-T059 can run in parallel):

```
Task: "User model in apps/form-builder-server/src/database/models/user.model.ts"
Task: "Form model in apps/form-builder-server/src/database/models/form.model.ts"
Task: "Section model in apps/form-builder-server/src/database/models/section.model.ts"
Task: "Question model in apps/form-builder-server/src/database/models/question.model.ts"
Task: "FormSubmission model in apps/form-builder-server/src/database/models/form-submission.model.ts"
Task: "FormSubmissionData model in apps/form-builder-server/src/database/models/form-submission-data.model.ts"
Task: "UserSession model in apps/form-builder-server/src/database/models/user-session.model.ts"
```

### Phase 3.3 Services (T068-T076 can run in parallel):

```
Task: "AuthService in apps/form-builder-server/src/auth/services/auth.service.ts"
Task: "UserService in apps/form-builder-server/src/users/services/user.service.ts"
Task: "FormService in apps/form-builder-server/src/forms/services/form.service.ts"
Task: "SectionService in apps/form-builder-server/src/forms/services/section.service.ts"
Task: "QuestionService in apps/form-builder-server/src/forms/services/question.service.ts"
Task: "SubmissionService in apps/form-builder-server/src/forms/services/submission.service.ts"
Task: "AnalyticsService in apps/form-builder-server/src/forms/services/analytics.service.ts"
Task: "EmailService in apps/form-builder-server/src/shared/services/email.service.ts"
Task: "FileUploadService in apps/form-builder-server/src/shared/services/file-upload.service.ts"
```

## Notes

- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Follow TDD approach strictly
- Maintain 80%+ test coverage
- Ensure TypeScript strict mode compliance
- Follow constitutional requirements throughout

## Task Generation Rules

_Applied during main() execution_

1. **From Contracts**:
   - Each contract file → contract test task [P]
   - Each endpoint → implementation task
2. **From Data Model**:
   - Each entity → model creation task [P]
   - Relationships → service layer tasks
3. **From User Stories**:
   - Each story → integration test [P]
   - Quickstart scenarios → validation tasks

4. **Ordering**:
   - Setup → Tests → Models → Services → Endpoints → Polish
   - Dependencies block parallel execution

## Validation Checklist

_GATE: Checked by main() before returning_

- [x] All contracts have corresponding tests (27 contract tests)
- [x] All entities have model tasks (7 entities)
- [x] All tests come before implementation
- [x] Parallel tasks truly independent
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task
- [x] TDD approach enforced
- [x] Constitutional compliance maintained
- [x] Complete coverage of all design artifacts
