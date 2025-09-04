export interface CreateChatResponseDto {
  chatId: string;
}

export interface CreateCompletionDto {
  message: string;
}

export interface CreateCompletionResponseDto {
  messageId: string;
  createdAt: string;
  content: string;
}

export interface CreateCompletionPromptDto {
  message: string;
  promptId: string;
  args?: Record<string, any>;
}

export interface PromptArgumentDto {
  name: string;
  required: boolean;
}

export interface PromptDto {
  name: string;
  title: string;
  description: string;
  arguments: PromptArgumentDto[];
}

export interface ListPromptsResponseDto {
  prompts: PromptDto[];
}

export interface ResourceDto {
  name: string;
  title: string;
  uri: string;
  description: string;
  mimetype: string;
}

export interface ListResourcesResponseDto {
  resources: ResourceDto[];
}

export interface ToolInputSchemaDto {
  type: string;
  properties: Record<string, any>;
  required: string[];
  additionalProperties: boolean;
  $schema: string;
}

export interface ToolDto {
  name: string;
  title: string;
  description: string;
  inputSchema: ToolInputSchemaDto;
}

export interface ListToolsResponseDto {
  tools: ToolDto[];
}

export interface SignInDto {
  email: string;
  password: string;
}

export interface SignInResponseDto {
  accessToken: string;
  user: {
    email: string;
    name: string;
  };
}

export interface CheckStatusResponseDto {
  user: {
    email: string;
    name: string;
  };
}

export interface FindAllResponseDto {
  id: string;
  pinDate: string;
  firstPrompt: string;
  lastMessageAt: string;
  title: string;
}

export interface ChatMessageDto {
  createdAt: string;
  messageId: string;
  feedback: boolean;
  prompt: string;
  response: string;
}

export interface FindOneResponseDto {
  id: string;
  active: boolean;
  pinDate: string;
  user: string;
  messages: ChatMessageDto[];
  createdAt: string;
  updatedAt: string;
  firstPrompt: string;
  lastMessageAt: string;
  title: string;
}

export interface User {
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
  feedback?: boolean;
}

export interface Chat {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
}

export interface ChatState {
  chats: Chat[];
  currentChat: Chat | null;
  isLoading: boolean;
}