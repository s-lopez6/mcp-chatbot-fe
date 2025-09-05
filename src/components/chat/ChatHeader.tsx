import { Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/history/useGetChat";

export const ChatHeader = () => {
  const { chatId } = useParams<{ chatId?: string }>();
  const { data: currentChat } = useGetChat(chatId || "");

  return (
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
  );
};
