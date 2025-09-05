import React, { useState } from "react";
import { Box, TextField, IconButton, Paper } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateCompletion } from "../../hooks/chat/useCreateCompletion";
import { useCreateChat } from "../../hooks/chat/useCreateChat";

interface ChatInputProps {
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  disabled = false,
  placeholder = "Type your message...",
}) => {
  const { chatId } = useParams<{ chatId?: string }>();

  const [message, setMessage] = useState("");

  const createCompletion = useCreateCompletion();
  const createChat = useCreateChat();
  const navigate = useNavigate();

  const handleSendMessage = async (message: string) => {
    if (!chatId) {
      try {
        const newChatId = await createChat.mutateAsync();

        // Send the message to the new chat
        await createCompletion.mutateAsync({
          chatId: newChatId,
          data: { message },
        });

        // todo -> improve by navigating when mutating
        navigate(`/chat/${newChatId}`);
      } catch (error) {
        console.error("Error creating chat:", error);
      }
    } else {
      // Send message to existing chat
      await createCompletion.mutateAsync({
        chatId: chatId,
        data: { message },
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      handleSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderTop: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          alignItems: "flex-end",
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          variant="outlined"
          size="small"
          InputProps={{
            sx: {
              borderRadius: 3,
            },
          }}
        />
        <IconButton
          type="submit"
          disabled={!message.trim() || disabled}
          color="primary"
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            "&:hover": {
              bgcolor: "primary.dark",
            },
            "&:disabled": {
              bgcolor: "action.disabled",
              color: "action.disabled",
            },
          }}
        >
          <Send />
        </IconButton>
      </Box>
    </Paper>
  );
};
// todo auto focus input
