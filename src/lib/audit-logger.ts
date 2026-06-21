export interface AuditLog {
  userId?: string;
  action: string;
  resource: string;
  changes?: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  status: "success" | "failure";
}

/**
 * Log audit events to stdout in structured JSON format
 */
export function logAuditEvent(log: AuditLog) {
  const logMessage = JSON.stringify({
    level: log.status === "failure" ? "WARN" : "INFO",
    timestamp: log.timestamp.toISOString(),
    userId: log.userId || "anonymous",
    action: log.action,
    resource: log.resource,
    changes: log.changes,
    ipAddress: log.ipAddress,
    userAgent: log.userAgent,
    status: log.status
  });

  if (log.status === "failure") {
    console.warn(`[AUDIT_LOG_FAILURE] ${logMessage}`);
  } else {
    console.log(`[AUDIT_LOG_SUCCESS] ${logMessage}`);
  }
}

/**
 * Create a scoped logger for a request context
 */
export function createAuditLogger(request: Request, userId?: string) {
  const ipAddress =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";
  const userAgent = request.headers.get("user-agent") || "unknown";

  return {
    log: (
      action: string,
      resource: string,
      changes?: Record<string, any>,
      status: "success" | "failure" = "success"
    ) => {
      logAuditEvent({
        userId,
        action,
        resource,
        changes,
        ipAddress,
        userAgent,
        timestamp: new Date(),
        status
      });
    }
  };
}
