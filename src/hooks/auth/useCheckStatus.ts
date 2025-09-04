import { useQuery } from "@tanstack/react-query";
import { authApi } from "../../services/api";
import { useAuthStore } from "../../store/authStore";
import { QUERY_KEYS } from "../queryKeys";

export const useCheckStatus = () => {
  const { updateUser } = useAuthStore();
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: [QUERY_KEYS.AUTH_STATUS],
    queryFn: async () => {
      const response = await authApi.checkStatus();
      updateUser(response.data.user);
      return response;
    },
    enabled: !!token,
    retry: false,
  });
};
