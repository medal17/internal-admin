import { useQuery } from "react-query";
import gatewayApi from "../../core/config/gatewayApi";

export const useRequest = (
    endpoint: string,
    type: string,
    queryKey: string,
    requestPayload?:any,
    page?: number,
    other?:any,
    allOtherCriteria?:any

  ) => {
    // const request = await budgetApi.get(`organizations?page=${page}&size=10`);
    return useQuery({
      queryKey: [queryKey, page, other, allOtherCriteria],
      queryFn: async () => {
        const res =
          (await type) === "get"
            ? await gatewayApi.get(endpoint)
            : await gatewayApi.post(endpoint, requestPayload);
        if (res.status === 200) {
          return res?.data;
        }
      },
      // staleTime: 3000000,
      // keepPreviousData: true,
      retry:false,
      
    });
  };