interface QueryParams {
  page?: number;
  limit?: number;
  filter?: string;
  search?: string;
  order_by?: string;
  sorted_by?: "asc" | "desc";
  with?: string;
}
