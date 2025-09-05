import { useMemo } from "react";
import type { Chat } from "../../types/api";
import { useGetHistory } from "./useGetHistory";

export const usePinnedChats = () => {
  const { data: chats } = useGetHistory();

  const { pinnedChats, unpinnedChats } = useMemo(() => {
    const pinnedChats: Chat[] = [];
    const unpinnedChats: Chat[] = [];

    chats.forEach((chat) => {
      if (chat.isPinned) pinnedChats.push(chat);
      else unpinnedChats.push(chat);
    });

    return {
      pinnedChats,
      unpinnedChats,
    };
  }, [chats]);

  const hasPinnedChats = pinnedChats.length > 0;
  const hasUnpinnedChats = unpinnedChats.length > 0;
  const hasChats = hasPinnedChats || hasUnpinnedChats;

  return {
    // pinned
    pinnedChats,
    hasPinnedChats,

    // unpinned
    unpinnedChats,
    hasUnpinnedChats,

    // chats
    hasChats,
  };
};
