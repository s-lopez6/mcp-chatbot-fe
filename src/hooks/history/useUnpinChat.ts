import { useMutation, useQueryClient } from "@tanstack/react-query";
import { historyApi } from "../../services/api";
import { useChatStore } from "../../store/chatStore";
import { QUERY_KEYS } from "../queryKeys";

export const useUnpinChat = () => {
  const { unpinChat } = useChatStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chatId: string) => historyApi.unpinChat(chatId),
    onSuccess: (_, chatId) => {
      unpinChat(chatId);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHATS] });
    },
  });
};
