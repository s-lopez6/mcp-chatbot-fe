import { ChatBubbleOutline } from "@mui/icons-material";
import { Box, Divider, List, Typography } from "@mui/material";
import { useGetHistory } from "../../hooks/history/useGetHistory";
import { useChatStore } from "../../store/chatStore";
import { ChatListItem } from "./ChatListItem";

export const ChatSidebarList = () => {
  const { chats } = useChatStore();
  const { isLoading: isLoadingHistory } = useGetHistory();

  const pinnedChats = chats.filter((chat) => chat.isPinned);
  const unpinnedChats = chats.filter((chat) => !chat.isPinned);

  return (
    <Box sx={{ flex: 1, overflow: "auto" }}>
      {isLoadingHistory ? (
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Loading chats...
          </Typography>
        </Box>
      ) : (
        <List sx={{ p: 1 }}>
          {/* Pinned Chats */}
          {pinnedChats.length > 0 && (
            <>
              {pinnedChats.map((chat) => (
                <ChatListItem key={chat.id} chat={chat} />
              ))}
              {unpinnedChats.length > 0 && <Divider sx={{ my: 1 }} />}
            </>
          )}

          {/* Regular Chats */}
          {unpinnedChats.length > 0 && (
            <>
              {unpinnedChats.map((chat) => (
                <ChatListItem key={chat.id} chat={chat} />
              ))}
            </>
          )}

          {chats.length === 0 && !isLoadingHistory && (
            <Box sx={{ p: 3, textAlign: "center" }}>
              <ChatBubbleOutline
                sx={{ fontSize: 48, color: "text.disabled", mb: 2 }}
              />
              <Typography variant="body2" color="text.secondary">
                No chats yet
              </Typography>
              <Typography variant="caption" color="text.disabled">
                Start a new conversation to get started
              </Typography>
            </Box>
          )}
        </List>
      )}
    </Box>
  );
};
