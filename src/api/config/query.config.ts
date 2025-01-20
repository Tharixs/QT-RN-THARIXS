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
  const baseUrl = "http://192.168.179.79:3000/api";
  const query = buildBaseQuery(baseUrl);
  const result = await query(args, api, extraOptions);
  return result;
};

const buildBaseQuery = (baseUrl: string) => {
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const token =
        "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiY3NMTlVhUVJMcE5xNUwwSGV4dy1HdUJIaFFBRk1iM1V1RmM5MnI5SnlIdUdoaFdPUmN1c1ZaeUp5bXhlSzFyZnZQWHd6bnhXYm1vLUFmMXhRSUNvQ3cifQ..pVm8OWZPZsyj8IWGnSOytA.qb7UNSNM5PPn1F0mjrx47glUd9Ox8nIoPZfZ3U7JK0DKYESsQoeNglxDT4BCsMVx8uHwsvgI0t6bWxE9SY9qsLTPocW86AnTqKYoqDDTrHtSJmI7xAHEj9ZsAnmcdvT-k5paEFUgvEDX03Sf10vExZ3zYvHpZaoxQl5YXqy3x7ejzVAWi9Hj-4T0l6_4RYb92y4QWdYJ32hRMekoYFMLOtKu29WYc537YaV2lpZ4zLV6vdFjXVubi2giwlR0lrbTA94GHT6UKBZg8H0KohRhMJfPvlTErl0SrgaLi7ByL4E.WibdgUkYsolOCzUsKlnm4VN7iEhw9pDLQzQz0WDBWU0";
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
