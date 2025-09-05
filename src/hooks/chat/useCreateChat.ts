import { useMutation, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "../../services/api";
import { QUERY_KEYS } from "../queryKeys";
import { ChatNewMapper } from "../../components/chat/mapper/chat-new.mapper";

export const useCreateChat = () => {
  const queryClient = useQueryClient();

  const { data, mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const res = await chatApi.createChat();
      return res.data.chatId;
    },
    onSuccess: (data) => {
      const key = [QUERY_KEYS.CHAT, data];
      const newChat = ChatNewMapper.responseToChat2(data);
      queryClient.setQueryData(key, () => newChat);
    },
  });

  return {
    data,
    mutateAsync,
    isPending,
  };
};
