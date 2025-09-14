import "@typespec/http";
import "@typespec/rest";

using Http;
using Rest;

@route("/health")
@tag("Health")
namespace LokiForm.Health {
  @get
  @summary("Check server health status")
  @doc("Returns the current health status, uptime, environment information, and timestamp of the LokiForm server. This endpoint is used for monitoring, load balancer health checks, and system diagnostics to ensure the application is running properly. Provides essential metrics for system monitoring and alerting.")
  op checkServerHealth(): ServerHealth;

  @get
  @summary("Check database connectivity")
  @doc("Returns the current health status, timestamp, and database connection information for the LokiForm database. This endpoint is used for monitoring database connectivity, ensuring data persistence is available, and diagnosing database-related issues in the application. Essential for database monitoring and troubleshooting.")
  @route("/database")
  op checkDatabaseHealth(): ServerHealth;
}
