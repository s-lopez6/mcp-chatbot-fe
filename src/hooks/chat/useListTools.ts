import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../../services/api";
import { QUERY_KEYS } from "../queryKeys";

export const useListTools = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TOOLS],
    queryFn: () => chatApi.listTools(),
  });
};
