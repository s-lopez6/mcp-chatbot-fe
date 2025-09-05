import React from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { Person, SmartToy } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMessage as ChatMessageType } from "../../types/api";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";
  const isThinking = message.type == "thinking" && !isUser;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1,
          maxWidth: "80%",
          flexDirection: isUser ? "row-reverse" : "row",
        }}
      >
        <Avatar
          sx={{
            bgcolor: isUser ? "primary.main" : "secondary.main",
            width: 32,
            height: 32,
          }}
        >
          {isUser ? <Person fontSize="small" /> : <SmartToy fontSize="small" />}
        </Avatar>

        <Paper
          elevation={1}
          sx={{
            p: 2,
            bgcolor: isUser ? "primary.main" : "background.paper",
            color: isUser ? "primary.contrastText" : "text.primary",
            borderRadius: 2,
          }}
        >
          {isUser ? (
            <Typography
              variant="body1"
              sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            >
              {message.content}
            </Typography>
          ) : (
            <Box
              sx={{
                "& > *:first-of-type": { mt: 0 },
                "& > *:last-child": { mb: 0 },
              }}
            >
              {!isThinking ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    img: ({ src, alt, ...props }) => (
                      <Box
                        component="img"
                        src={src}
                        alt={alt}
                        sx={{
                          maxWidth: "100%",
                          height: "auto",
                          borderRadius: 1,
                          my: 1,
                        }}
                        {...props}
                      />
                    ),
                    p: ({ children }) => (
                      <Typography
                        variant="body1"
                        sx={{ mb: 1, "&:last-child": { mb: 0 } }}
                      >
                        {children}
                      </Typography>
                    ),
                    h1: ({ children }) => (
                      <Typography
                        variant="h4"
                        sx={{ mb: 1, mt: 2, "&:first-of-type": { mt: 0 } }}
                      >
                        {children}
                      </Typography>
                    ),
                    h2: ({ children }) => (
                      <Typography
                        variant="h5"
                        sx={{ mb: 1, mt: 2, "&:first-of-type": { mt: 0 } }}
                      >
                        {children}
                      </Typography>
                    ),
                    h3: ({ children }) => (
                      <Typography
                        variant="h6"
                        sx={{ mb: 1, mt: 2, "&:first-of-type": { mt: 0 } }}
                      >
                        {children}
                      </Typography>
                    ),
                    code: ({ children, className }) => {
                      const inline = !className;
                      return inline ? (
                        <Box
                          component="code"
                          sx={{
                            bgcolor: "grey.100",
                            px: 0.5,
                            py: 0.25,
                            borderRadius: 0.5,
                            fontFamily: "monospace",
                            fontSize: "0.875em",
                          }}
                        >
                          {children}
                        </Box>
                      ) : (
                        <Box
                          component="pre"
                          sx={{
                            bgcolor: "grey.100",
                            p: 2,
                            borderRadius: 1,
                            overflow: "auto",
                            my: 1,
                          }}
                        >
                          <Box
                            component="code"
                            sx={{ fontFamily: "monospace" }}
                          >
                            {children}
                          </Box>
                        </Box>
                      );
                    },
                    ul: ({ children }) => (
                      <Box component="ul" sx={{ pl: 2, my: 1 }}>
                        {children}
                      </Box>
                    ),
                    ol: ({ children }) => (
                      <Box component="ol" sx={{ pl: 2, my: 1 }}>
                        {children}
                      </Box>
                    ),
                    li: ({ children }) => (
                      <Typography
                        component="li"
                        variant="body1"
                        sx={{ mb: 0.5 }}
                      >
                        {children}
                      </Typography>
                    ),
                    blockquote: ({ children }) => (
                      <Box
                        sx={{
                          borderLeft: 4,
                          borderColor: "primary.main",
                          pl: 2,
                          ml: 1,
                          my: 1,
                          fontStyle: "italic",
                        }}
                      >
                        {children}
                      </Box>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              ) : (
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
              )}
            </Box>
          )}
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 1,
              opacity: 0.7,
              color: isUser ? "primary.contrastText" : "text.secondary",
            }}
          >
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};
