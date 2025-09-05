import { ChatBubbleOutline } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import { ChatInput } from "./ChatInput";

import { env } from "../../config/env";

export const ChatWelcomeMessage = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
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
};
