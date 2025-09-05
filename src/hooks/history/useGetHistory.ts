import { useInfiniteQuery } from "@tanstack/react-query";
import { historyApi } from "../../services/api";
import type { Chat } from "../../types/api";
import { QUERY_KEYS } from "../queryKeys";
import { GetHistoryMapper } from "./mappers/get-history.mapper";

const LIMIT = 4;

export const useGetHistory = () => {
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

        const chats: Chat[] = response.data.data.map((item) =>
          GetHistoryMapper.responseToChat(item)
        );

        return {
          chats,
          hasNextPage: response.data.meta.hasNextPage,
        };
      },
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.hasNextPage) {
          return allPages.length;
        }
      },
      retry: 1,
    });

  return {
    isLoading,
    isFetching,
    data: data?.pages?.flatMap((page) => page?.chats) || [],
    hasNextPage,
    fetchNextPage,
  };
};
