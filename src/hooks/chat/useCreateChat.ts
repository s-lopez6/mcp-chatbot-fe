import { useMutation, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "../../services/api";
import { QUERY_KEYS } from "../queryKeys";

export const useCreateChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => chatApi.createChat(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHATS] }); // todo en lugar de invalidarlo, y si lo añadimos?
    },
  });
};
