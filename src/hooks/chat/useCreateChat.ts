import { useMutation, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "../../services/api";

export const useCreateChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => chatApi.createChat(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] }); // todo en lugar de invalidarlo, y si lo añadimos?
    },
  });
};

// todo clave
