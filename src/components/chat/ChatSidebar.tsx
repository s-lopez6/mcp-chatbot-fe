import { Box, Drawer } from "@mui/material";

import { ChatSidebarHeader } from "./ChatSidebarHeader";
import { ChatSidebarList } from "./ChatSidebarList";

const SIDEBAR_WIDTH = 320;

export const ChatSidebar = () => {
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
        <ChatSidebarHeader />
        <ChatSidebarList />
      </Box>
    </Drawer>
  );
};
