import { useQuery } from "@tanstack/react-query";
import { historyApi } from "../../services/api";
import { useChatStore } from "../../store/chatStore";
import type { Chat } from "../../types/api";
import { QUERY_KEYS } from "../queryKeys";
import { GetHistoryMapper } from "./mappers/get-history.mapper";

export const useGetHistory = (params?: { limit?: number; offset?: number }) => {
  const { setChats } = useChatStore();

  return useQuery({
    queryKey: [QUERY_KEYS.CHATS, params],
    queryFn: async () => {
      const response = await historyApi.getHistory({
        limit: 13,
      });
      const chats: Chat[] = response.data.map((item) =>
        GetHistoryMapper.responseToChat(item)
      );
      setChats(chats);
      return response;
    },
  });
};
