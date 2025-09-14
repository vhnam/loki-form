@doc("A template for a standard API error with a unique code and a message.")
model ApiError<Code extends string> {
  code: Code;
  message: string;
}

@error
@doc("Error returned when request validation fails, containing specific details about validation errors")
model ValidationError extends ApiError<"VALIDATION_ERROR"> {
  @doc("Array of specific validation error messages describing what went wrong")
  details: string[];
}

@error
@doc("Error returned when the request lacks valid authentication credentials or the user is not authorized to access the resource")
model UnauthorizedError extends ApiError<"UNAUTHORIZED"> {}

@error
@doc("Error returned when the requested resource could not be found or does not exist")
model NotFoundError extends ApiError<"NOT_FOUND"> {}

@error
@doc("Error returned when an unexpected server error occurs, indicating a problem with the server's internal processing")
model InternalServerError extends ApiError<"INTERNAL_SERVER_ERROR"> {}

@doc("Pagination metadata model containing information about the current page, total items, and navigation state for paginated API responses")
model Pagination {
  @doc("Current page number (1-based indexing)")
  page: int32;

  @doc("Number of items per page")
  perPage: int32;

  @doc("Total number of items across all pages")
  total: int32;

  @doc("Total number of pages available")
  totalPages: int32;

  @doc("Whether there is a previous page available")
  hasPrev: boolean;

  @doc("Whether there is a next page available")
  hasNext: boolean;
}

@doc("Paginated response model containing an array of data items along with comprehensive pagination metadata for managing large datasets efficiently")
model Page<T> {
  @doc("Array of data items for the current page")
  @pageItems
  data: T[];

  @doc("Pagination metadata including page information, totals, and navigation state")
  pagination: Pagination;
}
