import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./config/query.config";
export const myAppApi = createApi({
  baseQuery: baseQuery,
  endpoints: (build) => ({}),
});
