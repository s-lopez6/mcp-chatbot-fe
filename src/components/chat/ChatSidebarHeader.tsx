import { Add, Logout, Person } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useAuthStore } from "../../store/authStore";
import { useSignOut } from "../../hooks/auth/useSignOut";
import { useNavigate } from "react-router-dom";
import { useCreateChat } from "../../hooks/chat/useCreateChat";

export const ChatSidebarHeader = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const signOut = useSignOut();
  const createChat = useCreateChat();

  const handleNewChat = async () => {
    navigate("/chat");
  };

  return (
    <Paper elevation={0} sx={{ p: 2, bgcolor: "background.default" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
            <Person fontSize="small" />
          </Avatar>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>
        </Box>
        <IconButton onClick={signOut} size="small">
          <Logout fontSize="small" />
        </IconButton>
      </Box>

      <Button
        fullWidth
        variant="contained"
        startIcon={<Add />}
        onClick={handleNewChat}
        disabled={createChat.isPending}
        sx={{ borderRadius: 2 }}
      >
        New Chat
      </Button>
    </Paper>
  );
};
