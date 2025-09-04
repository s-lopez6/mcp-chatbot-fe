import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { ChatSidebar } from '../chat/ChatSidebar';
import { ChatInterface } from '../chat/ChatInterface';
import { useGetChat } from '../../hooks/useChat';
import { useChatStore } from '../../store/chatStore';

export const ChatLayout: React.FC = () => {
  const { chatId } = useParams<{ chatId?: string }>();
  const { setCurrentChat } = useChatStore();
  
  // Clear current chat when switching between chats to avoid stale data
  useEffect(() => {
    // Clear current chat immediately when chatId changes (before new data loads)
    setCurrentChat(null);
  }, [chatId, setCurrentChat]);
  
  // Load selected chat when chatId changes
  useGetChat(chatId || '');

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <ChatSidebar />
      <ChatInterface />
    </Box>
  );
};