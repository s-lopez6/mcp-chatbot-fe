import { useMutation, useQuery } from "@tanstack/react-query";
import { authApi } from "../../services/api";
import { useAuthStore } from "../../store/authStore";
import type { SignInDto } from "../../types/api";

export const useSignIn = () => {
  const { signIn, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: (data: SignInDto) => authApi.signIn(data),
    onMutate: () => setLoading(true),
    onSuccess: (response) => {
      const { accessToken, user } = response.data;
      signIn(accessToken, user);
    },
    onError: () => setLoading(false),
    onSettled: () => setLoading(false),
  });
};

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

export const useSignOut = () => {
  const { signOut } = useAuthStore();

  return () => {
    signOut();
  };
};
