const ALLOWED_SUB_DOMAINS = ["ayanagar", "ku", "admin"];
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

export { ALLOWED_SUB_DOMAINS, HTTP_METHODS, API_STATE };
