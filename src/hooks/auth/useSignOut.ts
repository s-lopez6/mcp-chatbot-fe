import { useAuthStore } from "../../store/authStore";

export const useSignOut = () => {
  const { signOut } = useAuthStore();

  return () => {
    signOut();
  };
};
