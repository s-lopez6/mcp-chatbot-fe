import { useMutation, useQueryClient } from "@tanstack/react-query";
import { historyApi } from "../../services/api";
import { useChatStore } from "../../store/chatStore";
import { QUERY_KEYS } from "../queryKeys";

export const usePinChat = () => {
  const { pinChat } = useChatStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chatId: string) => historyApi.pinChat(chatId),
    onSuccess: (_, chatId) => {
      pinChat(chatId);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHATS] });
    },
  });
};
