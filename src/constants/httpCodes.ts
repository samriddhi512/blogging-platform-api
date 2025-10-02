export const HTTP_CODE = {
  // Success
  OK: 200, // General success
  CREATED: 201, // Resource created
  NO_CONTENT: 204, // Success but no response body

  // Client errors
  BAD_REQUEST: 400, // Invalid request / missing parameters
  UNAUTHORIZED: 401, // Auth required or invalid credentials
  FORBIDDEN: 403, // Authenticated but not allowed
  NOT_FOUND: 404, // Resource not found
  CONFLICT: 409, // Resource conflict (e.g., duplicate)

  // Server errors
  INTERNAL_SERVER_ERROR: 500, // General server error
  SERVICE_UNAVAILABLE: 503, // Server temporarily unavailable
};
