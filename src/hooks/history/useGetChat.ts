import { useQuery } from "@tanstack/react-query";
import { historyApi } from "../../services/api";
import { useChatStore } from "../../store/chatStore";
import type { Chat, ChatMessage } from "../../types/api";
import { QUERY_KEYS } from "../queryKeys";

export const useGetChat = (chatId: string) => {
  const { setCurrentChat } = useChatStore();

  return useQuery({
    queryKey: [QUERY_KEYS.CHAT, chatId],
    queryFn: async () => {
      if (!chatId) {
        setCurrentChat(null);
        return null;
      }

      const response = await historyApi.getChat(chatId);
      const chatData = response.data;
      const messages: ChatMessage[] = [];

      // For each message from the API, create both user and assistant messages
      chatData.messages.forEach((msg) => {
        // Add user message (prompt)
        messages.push({
          id: `${msg.messageId}-user`,
          content: msg.prompt,
          role: "user" as const,
          timestamp: msg.createdAt,
        });

        // Add assistant message (response)
        messages.push({
          id: msg.messageId,
          content: msg.response,
          role: "assistant" as const,
          timestamp: msg.createdAt,
          feedback: msg.feedback,
        });
      });

      const chat: Chat = {
        id: chatData.id,
        title: chatData.title,
        messages,
        createdAt: chatData.createdAt,
        updatedAt: chatData.updatedAt,
        isPinned: !!chatData.pinDate,
      };
      setCurrentChat(chat);
      return response;
    },
    enabled: !!chatId,
    staleTime: 0, // Always refetch when switching chats
    refetchOnMount: "always", // Always refetch when component mounts
  });
};
