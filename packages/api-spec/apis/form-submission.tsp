import "@typespec/http";
import "@typespec/rest";

using Http;
using Rest;

@route("/forms/{formId}/submissions")
@tag("Form submissions")
@useAuth(Http.BearerAuth)
namespace LokiForm.FormSubmission {
  @get
  @summary("Get paginated form submissions")
  @doc("Retrieves a paginated list of submissions for a specific form. Allows form owners to view all submissions with pagination support for managing large numbers of submissions. Returns submission data including field values, submission timestamps, and metadata.")
  op getResponses(
    @path formId: uuid,
    @pageIndex page?: int32 = 1,
    @pageSize perPage?: int32 = 10,
  ): Page<FormSubmission>;

  @get
  @route("{formSubmissionId}")
  @summary("Get form submission by ID")
  @doc("Retrieves a single form submission by its unique identifier. Returns the complete submission data including all field values, submission timestamp, and associated form metadata. This endpoint is used for detailed submission review and analysis.")
  op getResponse(
    @path formId: uuid,
    @path formSubmissionId: uuid,
  ): FormSubmission | NotFoundError;

  @post
  @summary("Submit form response")
  @doc("Submits a new response to a published form. Validates all required fields, field types, and constraints before storing the submission data. This endpoint is typically used by end users filling out forms and can be called without authentication for published forms.")
  op createResponse(
    @path formId: uuid,
    @bodyRoot payload: FormSubmission,
  ): FormSubmission;
}
