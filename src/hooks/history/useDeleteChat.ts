import { useMutation, useQueryClient } from "@tanstack/react-query";
import { historyApi } from "../../services/api";
import { useChatStore } from "../../store/chatStore";
import { QUERY_KEYS } from "../queryKeys";

export const useDeleteChat = () => {
  const { deleteChat } = useChatStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chatId: string) => historyApi.deleteChat(chatId),
    onSuccess: (_, chatId) => {
      deleteChat(chatId);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHATS] });
    },
  });
};
