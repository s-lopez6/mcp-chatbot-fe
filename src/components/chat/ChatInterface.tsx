import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { ChatBubbleOutline } from "@mui/icons-material";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { useChatStore } from "../../store/chatStore";
import { env } from "../../config/env";
import { useCreateChat } from "../../hooks/chat/useCreateChat";
import { useCreateCompletion } from "../../hooks/chat/useCreateCompletion";

export const ChatInterface: React.FC = () => {
  const { chatId } = useParams<{ chatId?: string }>();
  const navigate = useNavigate();
  const { currentChat } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const createCompletion = useCreateCompletion();
  const createChat = useCreateChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  const handleSendMessage = async (message: string) => {
    if (!chatId || !currentChat) {
      // Create a new chat first
      try {
        const newChatResponse = await createChat.mutateAsync();
        const newChatId = newChatResponse.data.chatId;

        // Navigate to the new chat
        navigate(`/chat/${newChatId}`);

        // Send the message to the new chat
        createCompletion.mutate({
          chatId: newChatId,
          data: { message },
        });
      } catch (error) {
        console.error("Error creating chat:", error);
      }
    } else {
      // Send message to existing chat
      createCompletion.mutate({
        chatId: chatId,
        data: { message },
      });
    }
  };

  if (!chatId) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
          }}
        >
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: "primary.main",
              mb: 3,
            }}
          >
            <ChatBubbleOutline sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            color="text.primary"
          >
            Welcome to {env.APP_NAME}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{ maxWidth: 500, mb: 4 }}
          >
            Start a conversation by typing a message below or select an existing
            chat from the sidebar.
          </Typography>
        </Box>

        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={createCompletion.isPending || createChat.isPending}
          placeholder="Start a new conversation..."
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      {/* Chat Header */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h6" component="h1" noWrap>
          {currentChat?.title || "Loading..."}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {currentChat?.messages.length || 0} messages
        </Typography>
      </Paper>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: 2,
          bgcolor: "background.default",
        }}
      >
        {!currentChat ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : currentChat.messages.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography variant="body1" color="text.secondary">
              No messages yet. Start the conversation!
            </Typography>
          </Box>
        ) : (
          <>
            {currentChat.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {createCompletion.isPending && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "secondary.main",
                      width: 32,
                      height: 32,
                    }}
                  >
                    <ChatBubbleOutline fontSize="small" />
                  </Avatar>

                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      bgcolor: "background.paper",
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <CircularProgress size={16} />
                    <Typography variant="body2" color="text.secondary">
                      AI is thinking...
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </Box>

      {/* Chat Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={createCompletion.isPending}
      />
    </Box>
  );
};
