import type { Chat, FindAllDataResponseDto } from "../../../types/api";

export class GetHistoryMapper {
  static responseToChat(response: FindAllDataResponseDto): Chat {
    return {
      id: response.id,
      title: response.title,
      messages: [],
      lastMessageAt: response.lastMessageAt,
      createdAt: response.lastMessageAt,
      updatedAt: response.lastMessageAt,
      isPinned: !!response.pinDate,
    } as Chat;
  }
}
