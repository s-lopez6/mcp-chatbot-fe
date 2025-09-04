import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../../services/api";
import { QUERY_KEYS } from "../queryKeys";

export const useListPrompts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROMPTS],
    queryFn: () => chatApi.listPrompts(),
  });
};
