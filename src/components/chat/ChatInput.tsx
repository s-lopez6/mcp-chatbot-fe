import React, { useEffect, useRef, useState } from "react";
import { Box, TextField, IconButton, Paper } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateCompletion } from "../../hooks/chat/useCreateCompletion";
import { useCreateChat } from "../../hooks/chat/useCreateChat";
import { useSnackbar } from "../../contexts/SnackbarContext";

interface ChatInputProps {
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  placeholder = "Type your message...",
}) => {
  const { chatId } = useParams<{ chatId?: string }>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { showInfo } = useSnackbar();

  const handleMutate = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  const createCompletion = useCreateCompletion(handleMutate);
  const createChat = useCreateChat();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (message: string) => {
    inputRef.current?.focus();

    if (!chatId) {
      try {
        const newChatId = await createChat.mutateAsync();

        // Send the message to the new chat
        await createCompletion.mutateAsync({
          chatId: newChatId,
          data: { message },
        });
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

  const disabled = createCompletion.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      handleSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (disabled) {
        showInfo(
          "Please, wait until the assistant finishes with your last prompt ..."
        );
        e.preventDefault();
        return;
      }

      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        bgcolor: "background.default",
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
          color="primary"
          fullWidth
          inputRef={inputRef}
          multiline
          maxRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          variant="outlined"
          size="small"
          InputProps={{
            sx: {
              borderRadius: 3,
              bgcolor: "background.paper",
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
