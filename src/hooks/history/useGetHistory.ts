import { useInfiniteQuery } from "@tanstack/react-query";
import { historyApi } from "../../services/api";
import { useChatStore } from "../../store/chatStore";
import type { Chat } from "../../types/api";
import { QUERY_KEYS } from "../queryKeys";
import { GetHistoryMapper } from "./mappers/get-history.mapper";

const LIMIT = 13;

export const useGetHistory = () => {
  const { setChats } = useChatStore();

  const { isLoading, data, hasNextPage, isFetching, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [QUERY_KEYS.CHATS],
      staleTime: 1000 * 60 * 60,
      initialPageParam: 0,
      queryFn: async (params) => {
        const response = await historyApi.getHistory({
          limit: LIMIT,
          offset: params.pageParam * LIMIT,
        });

        console.log(response.data.data);

        const chats: Chat[] = response.data.data.map((item) =>
          GetHistoryMapper.responseToChat(item)
        );
        setChats(chats);
        return response;
      },
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.data.meta.hasNextPage) {
          return allPages.length;
        }
      },
      retry: 1,
    });

  return {
    isLoading,
    isFetching,
    data: data?.pages?.flatMap((page) => page?.data) || [],
    hasNextPage,
    fetchNextPage,
  };
};
