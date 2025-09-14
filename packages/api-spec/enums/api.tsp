@doc("Defines the API versioning scheme for the LokiForm API. Currently supports version 1.0 with comprehensive form management capabilities.")
enum Versions {
  @doc("API version 1.0 - Initial release with core form functionality including form creation, editing, publishing, submission management, user authentication, and health monitoring")
  v1: "1.0",
}

@doc("Defines the available sort order options for API endpoints that support sorting functionality.")
enum sortOrder {
  @doc("Sort results in ascending order (A-Z, 1-9, oldest to newest)")
  asc: "asc",

  @doc("Sort results in descending order (Z-A, 9-1, newest to oldest)")
  desc: "desc",
}
