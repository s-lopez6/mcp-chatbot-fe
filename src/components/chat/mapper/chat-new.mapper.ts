import type {
  Chat,
  ChatMessage,
  CreateCompletionResponseDto,
} from "../../../types/api";
import { v4 as uuidv4 } from "uuid";

export class ChatMessageMapper {
  static toUserMesage(message: string): ChatMessage {
    const now = new Date().toISOString();

    const userMessage: ChatMessage = {
      id: uuidv4(),
      content: message,
      role: "user",
      timestamp: now,
    };

    return userMessage;
  }

  static toAssistantMesage(response: CreateCompletionResponseDto): ChatMessage {
    const userMessage: ChatMessage = {
      id: response.messageId,
      content: response.content,
      role: "assistant",
      timestamp: response.createdAt,
    };

    return userMessage;
  }
}

export class ChatNewMapper {
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
