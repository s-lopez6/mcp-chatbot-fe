import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,
  IconButton,
  Divider,
  Avatar,
  Paper,
  Chip,
} from "@mui/material";
import {
  Add,
  ChatBubbleOutline,
  PushPin,
  PushPinOutlined,
  Delete,
  Logout,
  Person,
} from "@mui/icons-material";
import { useChatStore } from "../../store/chatStore";
import { useAuthStore } from "../../store/authStore";
import {
  useGetHistory,
  useDeleteChat,
  usePinChat,
  useUnpinChat,
  useCreateChat,
} from "../../hooks/useChat";
import { useSignOut } from "../../hooks/useAuth";
import { useSnackbar } from "../../contexts/SnackbarContext";

const SIDEBAR_WIDTH = 320;

export const ChatSidebar: React.FC = () => {
  const navigate = useNavigate();
  const { chatId } = useParams<{ chatId?: string }>();
  const { chats, currentChat } = useChatStore();
  const { user } = useAuthStore();
  const signOut = useSignOut();
  const { showConfirm } = useSnackbar();

  const { data: historyData, isLoading } = useGetHistory();
  const createChat = useCreateChat();
  const deleteChat = useDeleteChat();
  const pinChat = usePinChat();
  const unpinChat = useUnpinChat();

  const handleChatSelect = (selectedChatId: string) => {
    navigate(`/chat/${selectedChatId}`);
  };

  const handleNewChat = async () => {
    try {
      const response = await createChat.mutateAsync();
      navigate(`/chat/${response.data.chatId}`);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    showConfirm("¿Estás seguro de que quieres eliminar este chat?", () =>
      deleteChat.mutate(chatId)
    );
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

  const pinnedChats = chats.filter((chat) => chat.isPinned);
  const unpinnedChats = chats.filter((chat) => !chat.isPinned);

  const ChatListItem = ({ chat }: { chat: any }) => (
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

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
          bgcolor: "background.default",
          borderRight: 1,
          borderColor: "divider",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <Paper elevation={0} sx={{ p: 2, bgcolor: "background.paper" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
                <Person fontSize="small" />
              </Avatar>
              <Typography variant="subtitle2" noWrap>
                {user?.name}
              </Typography>
            </Box>
            <IconButton onClick={signOut} size="small">
              <Logout fontSize="small" />
            </IconButton>
          </Box>

          <Button
            fullWidth
            variant="contained"
            startIcon={<Add />}
            onClick={handleNewChat}
            disabled={createChat.isPending}
            sx={{ borderRadius: 2 }}
          >
            New Chat
          </Button>
        </Paper>

        <Divider />

        {/* Chat List */}
        <Box sx={{ flex: 1, overflow: "auto" }}>
          {isLoading ? (
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
                  {/* <ListItem>
                    <Chip
                      label="Pinned"
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  </ListItem> */}
                  {pinnedChats.map((chat) => (
                    <ChatListItem key={chat.id} chat={chat} />
                  ))}
                  {unpinnedChats.length > 0 && <Divider sx={{ my: 1 }} />}
                </>
              )}

              {/* Regular Chats */}
              {unpinnedChats.length > 0 && (
                <>
                  {/* {pinnedChats.length > 0 && (
                    <ListItem>
                      <Chip
                        label="Recent"
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                      />
                    </ListItem>
                  )} */}
                  {unpinnedChats.map((chat) => (
                    <ChatListItem key={chat.id} chat={chat} />
                  ))}
                </>
              )}

              {chats.length === 0 && !isLoading && (
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
      </Box>
    </Drawer>
  );
};
