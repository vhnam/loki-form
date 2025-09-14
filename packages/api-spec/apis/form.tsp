import "@typespec/http";
import "@typespec/rest";

using Http;
using Rest;

@route("/forms")
@tag("Forms")
@useAuth(Http.BearerAuth)
namespace LokiForm.Forms {
  @get
  @list
  @summary("Get paginated list of user forms")
  @doc("Retrieves a paginated list of forms created by the authenticated user. Supports filtering by form properties, sorting by various fields, and pagination to efficiently manage large collections of forms. Returns form metadata including title, description, status, and creation date.")
  op getForms(
    @query filter?: string,
    @pageIndex page?: int32 = 1,
    @pageSize perPage?: int32 = 10,
    sortBy?: string,
    sortOrder?: sortOrder,
  ): Page<Form>;

  @get
  @summary("Get form by ID")
  @doc("Retrieves a single form by its unique identifier. Returns the complete form definition including all sections, fields, field attributes, validation rules, and form configuration. This endpoint is used for form editing and detailed form viewing.")
  op getForm(@path formId: string): Form | NotFoundError;

  @post
  @summary("Create new form")
  @doc("Creates a new form with the provided configuration including title, description, sections, and fields. The form will be associated with the authenticated user and supports various field types (text, email, select, checkbox, date, number). Returns the created form with generated ID and timestamps.")
  op createForm(
    @body payload: Form,
  ): Form | ValidationError | UnauthorizedError;

  @put
  @summary("Update existing form")
  @doc("Updates an existing form with new configuration. All form properties including sections, fields, validation rules, and settings can be modified. The form version will be automatically incremented to track changes. Only the form owner can update their forms.")
  op updateForm(@path formId: string, @body payload: Form):
    | Form
    | ValidationError
    | UnauthorizedError
    | NotFoundError
    | InternalServerError;

  @delete
  @summary("Delete form permanently")
  @doc("Permanently deletes a form and all associated data including form submissions and responses. This action cannot be undone and should be used with caution. Only the form owner can delete their forms. All related data will be permanently removed from the system.")
  op deleteForm(@path formId: string):
    | void
    | NotFoundError
    | UnauthorizedError
    | InternalServerError;

  @post
  @route("{formId}/publish")
  @summary("Publish form for public access")
  @doc("Publishes a form, making it publicly accessible for submissions without authentication. Returns a public URL that can be shared with users to access and submit the form. Once published, the form becomes available for public submissions and can be accessed by anyone with the URL.")
  op publishForm(@path formId: string): {
    publicUrl: string;
  } | ValidationError | UnauthorizedError;
}
