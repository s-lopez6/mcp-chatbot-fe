import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../../services/api";

export const useListResources = () => {
  return useQuery({
    queryKey: ["resources"],
    queryFn: () => chatApi.listResources(),
  });
};
