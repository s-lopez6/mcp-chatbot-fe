import { useQuery } from "@tanstack/react-query";
import { historyApi } from "../../services/api";
import type { Chat } from "../../types/api";
import { QUERY_KEYS } from "../queryKeys";
import { GetChatMapper } from "./mappers/get-chat.mapper";

export const useGetChat = (chatId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.CHAT, chatId],
    queryFn: async () => {
      if (!chatId) {
        return null;
      }

      const response = await historyApi.getChat(chatId);
      const chat: Chat = GetChatMapper.responseToChat(response.data);

      return chat;
    },
    // enabled: !!chatId,
    // staleTime: 0, // Always refetch when switching chats
    // refetchOnMount: "always", // Always refetch when component mounts
  });

  return {
    data,
    isLoading,
  };
};
