import { myAppApi } from ".";

const jobApi = myAppApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getAllJob: build.query<any, { params: QueryParams }>({
      query: ({ params }) => ({
        url: "/pekerjaan",
        params,
      }),
      transformResponse: (response: any) => response,
    }),
  }),
});

export const { useGetAllJobQuery } = jobApi;
