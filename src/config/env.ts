export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'MCP Chatbot',
} as const;

export const API_ENDPOINTS = {
  // Authentication
  SIGN_IN: '/authentication/signin',
  CHECK_STATUS: '/authentication/check-status',
  
  // Chat
  CREATE_CHAT: '/chat',
  CREATE_COMPLETION: (chatId: string) => `/chat/completion/${chatId}`,
  CREATE_COMPLETION_PROMPT: (chatId: string) => `/chat/completion-prompt/${chatId}`,
  LIST_PROMPTS: '/chat/prompt',
  LIST_RESOURCES: '/chat/resources',
  LIST_TOOLS: '/chat/tools',
  
  // History
  GET_HISTORY: '/history',
  GET_CHAT: (chatId: string) => `/history/${chatId}`,
  DELETE_CHAT: (chatId: string) => `/history/${chatId}`,
  PIN_CHAT: (chatId: string) => `/history/pin/${chatId}`,
  UNPIN_CHAT: (chatId: string) => `/history/unpin/${chatId}`,
} as const;