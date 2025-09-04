import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { chatApi, historyApi } from "../services/api";
import { useChatStore } from "../store/chatStore";
import type {
  CreateCompletionDto,
  CreateCompletionPromptDto,
  Chat,
  ChatMessage,
  FindAllResponseDto,
  FindOneResponseDto,
} from "../types/api";
import type { AxiosResponse } from "axios";

export const useCreateChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => chatApi.createChat(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
};

export const useCreateCompletion = () => {
  const { addMessage } = useChatStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      chatId,
      data,
    }: {
      chatId: string;
      data: CreateCompletionDto;
    }) => chatApi.createCompletion(chatId, data),
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
      queryClient.invalidateQueries({ queryKey: ["chat", chatId] });
    },
  });
};

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
      queryClient.invalidateQueries({ queryKey: ["chat", chatId] });
    },
  });
};

export const useGetHistory = (params?: { limit?: number; offset?: number }) => {
  const { setChats } = useChatStore();

  return useQuery({
    queryKey: ["chats", params],
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

export const useGetChat = (chatId: string) => {
  const { setCurrentChat } = useChatStore();

  return useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
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
  });
};

export const useDeleteChat = () => {
  const { deleteChat } = useChatStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chatId: string) => historyApi.deleteChat(chatId),
    onSuccess: (_, chatId) => {
      deleteChat(chatId);
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
};

export const usePinChat = () => {
  const { pinChat } = useChatStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chatId: string) => historyApi.pinChat(chatId),
    onSuccess: (_, chatId) => {
      pinChat(chatId);
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
};

export const useUnpinChat = () => {
  const { unpinChat } = useChatStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chatId: string) => historyApi.unpinChat(chatId),
    onSuccess: (_, chatId) => {
      unpinChat(chatId);
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
};

export const useListPrompts = () => {
  return useQuery({
    queryKey: ["prompts"],
    queryFn: () => chatApi.listPrompts(),
  });
};

export const useListResources = () => {
  return useQuery({
    queryKey: ["resources"],
    queryFn: () => chatApi.listResources(),
  });
};

export const useListTools = () => {
  return useQuery({
    queryKey: ["tools"],
    queryFn: () => chatApi.listTools(),
  });
};
