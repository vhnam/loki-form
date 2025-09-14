import "@typespec/http";
import "@typespec/versioning";

import "./enums/api.tsp";

import "./types/api.tsp";
import "./types/scalar.tsp";

import "./models/form.tsp";
import "./models/form-submission.tsp";
import "./models/health.tsp";
import "./models/user.tsp";

import "./apis/auth.tsp";
import "./apis/form.tsp";
import "./apis/form-submission.tsp";
import "./apis/health.tsp";

using Http;
using Versioning;

@service(#{ title: "LokiForm API" })
@server("http://localhost:4000", "Development API endpoint")
@summary("LokiForm API - A comprehensive form builder service that enables users to create, manage, and publish dynamic forms with advanced features including conditional logic, multiple field types, real-time validation, and submission management.")
@doc("LokiForm is a modern, feature-rich form builder API built with Next.js and TypeScript in a Turborepo monorepo architecture. The API provides complete form lifecycle management including creation, editing, publishing, and submission handling. Key features include drag-and-drop form building, multiple field types (text, email, select, checkbox, date, number), conditional logic, form validation, user authentication, role-based access control, and comprehensive submission management with pagination support.")
@versioned(Versions)
namespace LokiForm;
