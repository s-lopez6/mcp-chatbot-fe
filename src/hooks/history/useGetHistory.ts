import { useQuery } from "@tanstack/react-query";
import { historyApi } from "../../services/api";
import { useChatStore } from "../../store/chatStore";
import type { Chat } from "../../types/api";
import { QUERY_KEYS } from "../queryKeys";

export const useGetHistory = (params?: { limit?: number; offset?: number }) => {
  const { setChats } = useChatStore();

  return useQuery({
    queryKey: [QUERY_KEYS.CHATS, params],
    queryFn: async () => {
      const response = await historyApi.getHistory(params);
      const chats: Chat[] = response.data.map((item) => ({
        id: item.id,
        title: item.title,
        messages: [],
        createdAt: item.lastMessageAt,
        updatedAt: item.lastMessageAt,
        isPinned: !!item.pinDate,
      }));
      setChats(chats);
      return response;
    },
  });
};
