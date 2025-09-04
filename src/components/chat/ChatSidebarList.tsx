import { ChatBubbleOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  List,
  Typography,
} from "@mui/material";
import { useGetHistory } from "../../hooks/history/useGetHistory";
import { ChatListItem } from "./ChatListItem";
import { usePinnedChats } from "../../hooks/history/usePinnedChats";

import RestartAltIcon from "@mui/icons-material/RestartAlt";

export const ChatSidebarList = () => {
  const { isLoading, isFetching, hasNextPage, fetchNextPage } = useGetHistory();

  const handleEndReached = () => {
    fetchNextPage();
  };

  const {
    pinnedChats,
    hasPinnedChats,
    unpinnedChats,
    hasUnpinnedChats,
    hasChats,
  } = usePinnedChats();

  return (
    <Box sx={{ flex: 1, overflow: "auto" }}>
      {isLoading && (
        <Box sx={{ p: 2, textAlign: "center" }}>
          <CircularProgress />
        </Box>
      )}
      <List sx={{ p: 1 }}>
        {/* Pinned Chats */}
        {hasPinnedChats && (
          <>
            {pinnedChats.map((chat) => (
              <ChatListItem key={chat.id} chat={chat} />
            ))}
            {hasUnpinnedChats && <Divider sx={{ my: 1 }} />}
          </>
        )}

        {/* Regular Chats */}
        {hasUnpinnedChats &&
          unpinnedChats.map((chat) => (
            <ChatListItem key={chat.id} chat={chat} />
          ))}

        {hasNextPage && (
          <Button
            loading={isFetching}
            fullWidth
            variant="outlined"
            startIcon={<RestartAltIcon />}
            onClick={handleEndReached}
            disabled={isFetching}
            sx={{ borderRadius: 2 }}
          >
            Load more
          </Button>
        )}

        {!hasChats && (
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
    </Box>
  );
};
