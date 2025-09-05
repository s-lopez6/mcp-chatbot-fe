import { useMutation, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "../../services/api";
import type { Chat, ChatMessage, CreateCompletionDto } from "../../types/api";
import { QUERY_KEYS } from "../queryKeys";
import { ChatMessageMapper } from "./mapper/chat-message.mapper";
import { produce } from "immer";

export const useCreateCompletion = () => {
  const queryClient = useQueryClient();

  const { data, isPending, mutateAsync } = useMutation({
    mutationFn: async ({
      chatId,
      data,
    }: {
      chatId: string;
      data: CreateCompletionDto;
    }) => {
      const res = await chatApi.createCompletion(chatId, data);
      return res.data;
    },
    onMutate: ({ chatId, data }) => {
      const key = [QUERY_KEYS.CHAT, chatId];
      const existingChat = queryClient.getQueryData<Chat>(key);

      if (!existingChat) {
        return;
      }

      const newUserMessage = ChatMessageMapper.toUserMesage(data.message);
      const assistantThinkingMessage = ChatMessageMapper.getThinkingMesage();

      queryClient.setQueryData(key, (oldData: Chat) => {
        return produce(oldData, (draft) => {
          draft.messages.push(newUserMessage);
          draft.messages.push(assistantThinkingMessage);
        });
      });
    },
    onSuccess: (response, { chatId, data }, context) => {
      const key = [QUERY_KEYS.CHAT, chatId];
      const existingChat = queryClient.getQueryData<Chat>(key);

      if (!existingChat) {
        return;
      }

      queryClient.setQueryData(key, (oldData: Chat) => {
        const assistantMessage: ChatMessage =
          ChatMessageMapper.toAssistantMesage(response);

        return produce(oldData, (draft) => {
          draft.messages.pop();
          draft.messages.push(assistantMessage);
        });
      });

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHATS] });
    },
  });

  return {
    data,
    isPending,
    mutateAsync,
  };
};
