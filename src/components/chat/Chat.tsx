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
import { ChatMessagesList } from "./ChatMessagesList";
import ChatInputMenu from "./ChatInputMenu";

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
      <ChatMessagesList />

      {/* Chat Input */}
      <ChatInput />
    </Box>
  );
};
