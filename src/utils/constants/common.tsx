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

export enum ViewActionTypes {
  VIEW = "view",
  EDIT = "edit",
  CREATE = "create",
}

export enum PaginationConstants {
  INFINITE = 999999999999,
  ZERO = 0,
}

export { ALLOWED_SUB_DOMAINS, HTTP_METHODS, API_STATE, TABLE_CONSTANTS };
