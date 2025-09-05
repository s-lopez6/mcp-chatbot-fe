import type { Chat } from "../../../types/api";

export class ChatMapper {
  static responseToChat(id: string): Chat {
    const now = new Date().toISOString();

    return {
      id,
      title: "",
      messages: [],
      lastMessageAt: now,
      createdAt: now,
      updatedAt: now,
      isPinned: false,
    } as Chat;
  }
}
