import { useMutation, useQueryClient } from "@tanstack/react-query";
import { historyApi } from "../../services/api";
import { QUERY_KEYS } from "../queryKeys";

export const usePinChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chatId: string) => historyApi.pinChat(chatId),
    onSuccess: (_, chatId) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHATS] });
    },
  });
};
