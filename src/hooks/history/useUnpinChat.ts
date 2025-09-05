import { useMutation, useQueryClient } from "@tanstack/react-query";
import { historyApi } from "../../services/api";
import { QUERY_KEYS } from "../queryKeys";

export const useUnpinChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chatId: string) => historyApi.unpinChat(chatId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHATS] });
    },
  });
};
