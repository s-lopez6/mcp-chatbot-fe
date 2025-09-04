import {
  ChatBubbleOutline,
  PushPin,
  PushPinOutlined,
  Delete,
} from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { usePinChat } from "../../hooks/history/usePinChat";
import { useUnpinChat } from "../../hooks/history/useUnpinChat";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { useDeleteChat } from "../../hooks/history/useDeleteChat";
import type { Chat } from "../../types/api";

interface Props {
  chat: Chat;
}

export const ChatListItem = ({ chat }: Props) => {
  const navigate = useNavigate();
  const { showConfirm } = useSnackbar();
  const { chatId } = useParams<{ chatId?: string }>();
  const pinChat = usePinChat();
  const unpinChat = useUnpinChat();
  const deleteChat = useDeleteChat();

  const handleChatSelect = (selectedChatId: string) => {
    navigate(`/chat/${selectedChatId}`);
  };

  const handlePinToggle = (
    chatId: string,
    isPinned: boolean,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    if (isPinned) {
      unpinChat.mutate(chatId);
    } else {
      pinChat.mutate(chatId);
    }
  };

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    showConfirm("¿Estás seguro de que quieres eliminar este chat?", () =>
      deleteChat.mutate(chatId)
    );
  };

  return (
    <ListItem disablePadding sx={{ mb: 0.5 }}>
      <ListItemButton
        onClick={() => handleChatSelect(chat.id)}
        selected={chatId === chat.id}
        sx={{
          borderRadius: 2,
          mx: 1,
          "&.Mui-selected": {
            bgcolor: "primary.light",
            color: "primary.contrastText",
            "&:hover": {
              bgcolor: "primary.main",
            },
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          <ChatBubbleOutline fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="body2" noWrap>
              {chat.title}
            </Typography>
          }
          secondary={
            <Typography variant="caption" color="text.secondary">
              {new Date(chat.updatedAt).toLocaleDateString()}
            </Typography>
          }
        />
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <IconButton
            size="small"
            onClick={(e) => handlePinToggle(chat.id, chat.isPinned, e)}
            sx={{ opacity: 0.7, "&:hover": { opacity: 1 } }}
          >
            {chat.isPinned ? (
              <PushPin fontSize="small" />
            ) : (
              <PushPinOutlined fontSize="small" />
            )}
          </IconButton>
          <IconButton
            size="small"
            onClick={(e) => handleDeleteChat(chat.id, e)}
            sx={{
              opacity: 0.7,
              "&:hover": { opacity: 1, color: "error.main" },
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      </ListItemButton>
    </ListItem>
  );
};
