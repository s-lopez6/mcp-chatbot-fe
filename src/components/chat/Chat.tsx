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
import { env } from "../../config/env";
import { useCreateCompletion } from "../../hooks/chat/useCreateCompletion";
import { useGetChat } from "../../hooks/history/useGetChat";
import { useSnackbar } from "../../contexts/SnackbarContext";

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

        <ChatInput placeholder="Start a new conversation..." />
      </Box>
    );
  }

  if (!currentChat) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
        }}
      >
        {/* Messages */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            p: 2,
            bgcolor: "background.default",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Upps! Chat not found
            </Typography>
          </Box>
        </Box>
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
          {currentChat?.title || ""}
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
      <ChatInput />
    </Box>
  );
};
