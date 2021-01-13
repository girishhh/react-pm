const ALLOWED_SUB_DOMAINS = ["test", "test1", "admin"];
enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
  HEAD = "HEAD",
}

enum API_STATE {
  LOADING = "loading",
  ERROR = "error",
  DONE = "done",
}

enum TABLE_CONSTANTS {
  PAGE_SIZE = 10,
}

export { ALLOWED_SUB_DOMAINS, HTTP_METHODS, API_STATE, TABLE_CONSTANTS };
