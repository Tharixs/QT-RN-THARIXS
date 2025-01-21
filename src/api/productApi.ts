import { myAppApi } from ".";
import { ProductPaginationResponse } from "../types/product";

const productApi = myAppApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductPaginationResponse,
      { params?: QueryParams }
    >({
      query: ({ params }) => ({
        url: "/products",
        method: "GET",
        params,
      }),
      transformResponse: (response: ProductPaginationResponse) => response,
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
