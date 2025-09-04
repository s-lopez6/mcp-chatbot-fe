import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../../services/api";

export const useListTools = () => {
  return useQuery({
    queryKey: ["tools"],
    queryFn: () => chatApi.listTools(),
  });
};
