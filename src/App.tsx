import React, { useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuthStore } from './store/authStore';
import { useCheckStatus } from './hooks/useAuth';
import { useGetChat } from './hooks/useChat';
import { LoginForm } from './components/auth/LoginForm';
import { ChatSidebar } from './components/chat/ChatSidebar';
import { ChatInterface } from './components/chat/ChatInterface';

function App() {
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  const [selectedChatId, setSelectedChatId] = useState<string>('');
  
  // Check authentication status on app load
  useCheckStatus();
  
  // Load selected chat
  useGetChat(selectedChatId);

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  if (authLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="body1" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <ChatSidebar onSelectChat={handleSelectChat} />
      <ChatInterface />
    </Box>
  );
}

export default App;