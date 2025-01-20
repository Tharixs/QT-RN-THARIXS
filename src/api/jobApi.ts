import { myAppApi } from ".";
import { paginationConfig } from "./config/pagination.config";

const jobApi = myAppApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getAllJob: build.query<PaginationResponse<any>, { params?: QueryParams }>({
      query: ({ params }) => ({
        url: "/pekerjaan",
        params,
      }),
      transformResponse: (response: PaginationResponse<any>) => response,
      ...paginationConfig(),
    }),
  }),
});

export const { useGetAllJobQuery } = jobApi;
