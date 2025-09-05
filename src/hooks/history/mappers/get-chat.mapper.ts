import type { Chat, ChatMessage, FindOneResponseDto } from "../../../types/api";

export class GetChatMapper {
  static responseToChat(response: FindOneResponseDto): Chat {
    const messages: ChatMessage[] = [];

    response.messages.forEach((msg) => {
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
      id: response.id,
      title: response.title,
      messages,
      lastMessageAt: response.lastMessageAt,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
      isPinned: !!response.pinDate,
    };

    return chat;
  }
}
