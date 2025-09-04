import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../../services/api";

export const useListPrompts = () => {
  return useQuery({
    queryKey: ["prompts"],
    queryFn: () => chatApi.listPrompts(),
  });
};
