import { Routes, Route, Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuthStore } from "./store/authStore";
import { LoginForm } from "./components/auth/LoginForm";
import { ChatLayout } from "./components/layout/ChatLayout";
import { useCheckStatus } from "./hooks/auth/useCheckStatus";

function App() {
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();

  // Check authentication status on app load
  useCheckStatus();

  if (authLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/chat" replace />} />
      <Route path="/chat" element={<ChatLayout />} />
      <Route path="/chat/:chatId" element={<ChatLayout />} />
    </Routes>
  );
}

export default App;
