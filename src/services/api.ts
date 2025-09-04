import axios, { type AxiosResponse } from "axios";
import { env, API_ENDPOINTS } from "../config/env";
import { useAuthStore } from "../store/authStore";
import type {
  SignInDto,
  SignInResponseDto,
  CheckStatusResponseDto,
  CreateChatResponseDto,
  CreateCompletionDto,
  CreateCompletionResponseDto,
  CreateCompletionPromptDto,
  ListPromptsResponseDto,
  ListResourcesResponseDto,
  ListToolsResponseDto,
  FindAllResponseDto,
  FindOneResponseDto,
} from "../types/api";

const api = axios.create({
  baseURL: env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().signOut();
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  signIn: (data: SignInDto): Promise<AxiosResponse<SignInResponseDto>> =>
    api.post(API_ENDPOINTS.SIGN_IN, data),

  checkStatus: (): Promise<AxiosResponse<CheckStatusResponseDto>> =>
    api.get(API_ENDPOINTS.CHECK_STATUS),
};

export const chatApi = {
  createChat: (): Promise<AxiosResponse<CreateChatResponseDto>> =>
    api.post(API_ENDPOINTS.CREATE_CHAT),

  createCompletion: (
    chatId: string,
    data: CreateCompletionDto
  ): Promise<AxiosResponse<CreateCompletionResponseDto>> =>
    api.post(API_ENDPOINTS.CREATE_COMPLETION(chatId), data),

  createCompletionPrompt: (
    chatId: string,
    data: CreateCompletionPromptDto
  ): Promise<AxiosResponse<CreateCompletionResponseDto>> =>
    api.post(API_ENDPOINTS.CREATE_COMPLETION_PROMPT(chatId), data),

  listPrompts: (): Promise<AxiosResponse<ListPromptsResponseDto>> =>
    api.get(API_ENDPOINTS.LIST_PROMPTS),

  listResources: (): Promise<AxiosResponse<ListResourcesResponseDto>> =>
    api.get(API_ENDPOINTS.LIST_RESOURCES),

  listTools: (): Promise<AxiosResponse<ListToolsResponseDto>> =>
    api.get(API_ENDPOINTS.LIST_TOOLS),
};

export const historyApi = {
  getHistory: (params?: {
    limit?: number;
    offset?: number;
  }): Promise<AxiosResponse<FindAllResponseDto>> =>
    api.get(API_ENDPOINTS.GET_HISTORY, { params }),

  getChat: (chatId: string): Promise<AxiosResponse<FindOneResponseDto>> =>
    api.get(API_ENDPOINTS.GET_CHAT(chatId)),

  deleteChat: (chatId: string): Promise<AxiosResponse<void>> =>
    api.delete(API_ENDPOINTS.DELETE_CHAT(chatId)),

  pinChat: (chatId: string): Promise<AxiosResponse<void>> =>
    api.put(API_ENDPOINTS.PIN_CHAT(chatId)),

  unpinChat: (chatId: string): Promise<AxiosResponse<void>> =>
    api.put(API_ENDPOINTS.UNPIN_CHAT(chatId)),
};

export default api;
