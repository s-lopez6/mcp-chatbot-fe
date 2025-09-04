import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { ChatSidebar } from '../chat/ChatSidebar';
import { ChatInterface } from '../chat/ChatInterface';
import { useGetChat } from '../../hooks/useChat';

export const ChatLayout: React.FC = () => {
  const { chatId } = useParams<{ chatId?: string }>();
  
  // Load selected chat when chatId changes
  useGetChat(chatId || '');

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <ChatSidebar />
      <ChatInterface />
    </Box>
  );
};