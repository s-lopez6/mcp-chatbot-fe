import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { ChatState, Chat, ChatMessage } from "../types/api";

interface ChatActions {
  setChats: (chats: Chat[]) => void;
  addChat: (chat: Chat) => void;
  updateChat: (chatId: string, updates: Partial<Chat>) => void;
  deleteChat: (chatId: string) => void;
  setCurrentChat: (chat: Chat | null) => void;
  addMessage: (chatId: string, message: ChatMessage) => void;
  updateMessage: (
    chatId: string,
    messageId: string,
    updates: Partial<ChatMessage>
  ) => void;
  setLoading: (loading: boolean) => void;
  pinChat: (chatId: string) => void;
  unpinChat: (chatId: string) => void;
}

type ChatStore = ChatState & ChatActions;

export const useChatStore = create<ChatStore>()(
  immer((set, get) => ({
    chats: [],
    currentChat: null,
    isLoading: false,

    setChats: (chats: Chat[]) => {
      set((state) => {
        state.chats.push(...chats);
      });
    },

    addChat: (chat: Chat) => {
      set((state) => {
        state.chats.unshift(chat);
      });
    },

    updateChat: (chatId: string, updates: Partial<Chat>) => {
      set((state) => {
        const chatIndex = state.chats.findIndex((chat) => chat.id === chatId);
        if (chatIndex !== -1) {
          Object.assign(state.chats[chatIndex], updates);
        }
        if (state.currentChat?.id === chatId) {
          Object.assign(state.currentChat, updates);
        }
      });
    },

    deleteChat: (chatId: string) => {
      set((state) => {
        state.chats = state.chats.filter((chat) => chat.id !== chatId);
        if (state.currentChat?.id === chatId) {
          state.currentChat = null;
        }
      });
    },

    setCurrentChat: (chat: Chat | null) => {
      set((state) => {
        state.currentChat = chat;
      });
    },

    addMessage: (chatId: string, message: ChatMessage) => {
      set((state) => {
        const chat = state.chats.find((c) => c.id === chatId);
        if (chat) {
          chat.messages.push(message);
          chat.updatedAt = new Date().toISOString();
        }
        if (state.currentChat?.id === chatId) {
          state.currentChat.messages.push(message);
          state.currentChat.updatedAt = new Date().toISOString();
        }
      });
    },

    updateMessage: (
      chatId: string,
      messageId: string,
      updates: Partial<ChatMessage>
    ) => {
      set((state) => {
        const chat = state.chats.find((c) => c.id === chatId);
        if (chat) {
          const messageIndex = chat.messages.findIndex(
            (m) => m.id === messageId
          );
          if (messageIndex !== -1) {
            Object.assign(chat.messages[messageIndex], updates);
          }
        }
        if (state.currentChat?.id === chatId) {
          const messageIndex = state.currentChat.messages.findIndex(
            (m) => m.id === messageId
          );
          if (messageIndex !== -1) {
            Object.assign(state.currentChat.messages[messageIndex], updates);
          }
        }
      });
    },

    setLoading: (loading: boolean) => {
      set((state) => {
        state.isLoading = loading;
      });
    },

    pinChat: (chatId: string) => {
      set((state) => {
        const chat = state.chats.find((c) => c.id === chatId);
        if (chat) {
          chat.isPinned = true;
        }
        if (state.currentChat?.id === chatId) {
          state.currentChat.isPinned = true;
        }
      });
    },

    unpinChat: (chatId: string) => {
      set((state) => {
        const chat = state.chats.find((c) => c.id === chatId);
        if (chat) {
          chat.isPinned = false;
        }
        if (state.currentChat?.id === chatId) {
          state.currentChat.isPinned = false;
        }
      });
    },
  }))
);
