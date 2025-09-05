import { Box } from "@mui/material";
import { ChatSidebar } from "../chat/ChatSidebar";
import { Chat } from "../chat/Chat";

export const ChatLayout = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <ChatSidebar />
      <Chat />
    </Box>
  );
};
