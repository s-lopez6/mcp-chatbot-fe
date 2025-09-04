import type { Chat, FindAllResponseDto } from "../../../types/api";

export class GetHistoryMapper {
  static responseToChat(response: FindAllResponseDto): Chat {
    return {
      id: response.id,
      title: response.title,
      messages: [],
      createdAt: response.lastMessageAt,
      updatedAt: response.lastMessageAt,
      isPinned: !!response.pinDate,
    };
  }
}
