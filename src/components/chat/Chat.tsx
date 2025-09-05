import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { useCreateCompletion } from "../../hooks/chat/useCreateCompletion";
import { useGetChat } from "../../hooks/history/useGetChat";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { ChatWelcomeMessage } from "./ChatWelcomeMessage";
import { ChatHeader } from "./ChatHeader";

export const Chat = () => {
  const { chatId } = useParams<{ chatId?: string }>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const createCompletion = useCreateCompletion();

  const { showError } = useSnackbar();

  const navigate = useNavigate();

  const handleError = () => {
    showError("Upss! Document not found");
    navigate(`/chat`);
  };

  const { data: currentChat } = useGetChat(chatId || "", handleError);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  if (!chatId) {
    return <ChatWelcomeMessage />;
  }

  if (!currentChat) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={80} />
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
      <ChatHeader />

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
      <ChatInput />
    </Box>
  );
};
