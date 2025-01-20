import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL as string;
  const query = buildBaseQuery(baseUrl);
  const result = await query(args, api, extraOptions);
  return result;
};

const buildBaseQuery = (baseUrl: string) => {
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const token = "";
      if (!headers.get("Authorization") && token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      if (!headers.get("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
      if (!headers.get("Accept")) {
        headers.set("Accept", "application/json");
      }
      if (!headers.get("plaform")) {
        headers.set("plaform", "Mobile");
      }
      return headers;
    },
  });
};
