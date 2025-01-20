import { myAppApi } from ".";

const userApi = myAppApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUser: build.query<void, { params?: QueryParams }>({
      query: ({ params }) => ({
        url: "/users",
        params,
      }),
      transformResponse: (response: any) => response,
    }),
  }),
});

export const { useGetAllUserQuery } = userApi;
