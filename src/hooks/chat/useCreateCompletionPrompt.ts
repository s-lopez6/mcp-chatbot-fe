import { useMutation, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "../../services/api";
import { useChatStore } from "../../store/chatStore";
import type { CreateCompletionPromptDto, ChatMessage } from "../../types/api";
import { QUERY_KEYS } from "../queryKeys";

export const useCreateCompletionPrompt = () => {
  const { addMessage } = useChatStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      chatId,
      data,
    }: {
      chatId: string;
      data: CreateCompletionPromptDto;
    }) => chatApi.createCompletionPrompt(chatId, data),
    onMutate: ({ chatId, data }) => {
      const userMessage: ChatMessage = {
        id: `temp-${Date.now()}`,
        content: data.message,
        role: "user",
        timestamp: new Date().toISOString(),
      };
      addMessage(chatId, userMessage);
    },
    onSuccess: (response, { chatId }) => {
      const assistantMessage: ChatMessage = {
        id: response.data.messageId,
        content: response.data.content,
        role: "assistant",
        timestamp: response.data.createdAt,
      };
      addMessage(chatId, assistantMessage);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHAT, chatId] });
    },
  });
};
