import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../../services/api";
import { QUERY_KEYS } from "../queryKeys";

export const useListTools = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.TOOLS],
    queryFn: async () => {
      const res = await chatApi.listTools();
      return res.data;
    },
  });

  return {
    data,
    isLoading,
  };
};
