import type {
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

  static getThinkingMesage(): ChatMessage {
    const now = new Date().toISOString();

    const userMessage: ChatMessage = {
      id: uuidv4(),
      content: "",
      role: "assistant",
      timestamp: now,
      type: "thinking",
    };

    return userMessage;
  }
}
