export const paginationConfig = <T>() => {
  return {
    forceRefetch({
      currentArg,
      previousArg,
    }: {
      currentArg: any;
      previousArg: any;
    }) {
      return currentArg !== previousArg;
    },
    serializeQueryArgs: ({
      endpointName,
      queryArgs,
    }: {
      endpointName: string;
      queryArgs: { params?: QueryParams };
    }) => {
      const params = queryArgs.params || {};
      return `${endpointName}-${JSON.stringify(params.filter)}-${JSON.stringify(params.search)}`;
    },
    merge: (
      currentCacheData: PaginationResponse<T>,
      newItems: PaginationResponse<T>,
    ) => {
      const paginationCache = currentCacheData.data.pagination;
      const paginationResponse = newItems.data.pagination;

      if (paginationCache.current_page < paginationResponse.current_page) {
        currentCacheData.data.items.push(...newItems.data.items);
        currentCacheData.data.pagination = paginationResponse;
      } else {
        currentCacheData.data.items = newItems.data.items;
        currentCacheData.data.pagination = paginationResponse;
      }
    },
  };
};
