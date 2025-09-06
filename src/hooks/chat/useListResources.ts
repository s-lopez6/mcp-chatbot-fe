import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../../services/api";
import { QUERY_KEYS } from "../queryKeys";

export const useListResources = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.RESOURCES],
    queryFn: async () => {
      const res = await chatApi.listResources();
      return res.data;
    },
  });
};
