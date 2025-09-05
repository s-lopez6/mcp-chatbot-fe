import { useQuery } from "@tanstack/react-query";
import { historyApi } from "../../services/api";
import type { Chat } from "../../types/api";
import { QUERY_KEYS } from "../queryKeys";
import { GetChatMapper } from "./mappers/get-chat.mapper";
import { isAxiosError } from "axios";

export const useGetChat = (chatId: string, onError?: () => void) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.CHAT, chatId],
    queryFn: async () => {
      if (!chatId) {
        return null;
      }

      try {
        const response = await historyApi.getChat(chatId);
        const chat: Chat = GetChatMapper.responseToChat(response.data);

        return chat;
      } catch (error) {
        console.error(error);
        if (isAxiosError(error)) {
          if (error.status === 400 || error.status === 404) {
            onError?.();
          }
        }

        return null;
      }
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
