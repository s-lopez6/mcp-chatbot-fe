import { useQuery } from "@tanstack/react-query";
import { authApi } from "../../services/api";
import { useAuthStore } from "../../store/authStore";

export const useCheckStatus = () => {
  const { updateUser } = useAuthStore();
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["auth-status"],
    queryFn: async () => {
      const response = await authApi.checkStatus();
      updateUser(response.data.user);
      return response;
    },
    enabled: !!token,
    retry: false,
  });
};
