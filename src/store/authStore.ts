import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { type AuthState, type User } from "../types/api";

interface AuthActions {
  signIn: (token: string, user: User) => void;
  signOut: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (user: User) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    immer((set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      signIn: (token: string, user: User) => {
        set((state) => {
          state.token = token;
          state.user = user;
          state.isAuthenticated = true;
          state.isLoading = false;
        });
      },

      signOut: () => {
        set((state) => {
          state.token = null;
          state.user = null;
          state.isAuthenticated = false;
          state.isLoading = false;
        });
      },

      setLoading: (loading: boolean) => {
        set((state) => {
          state.isLoading = loading;
        });
      },

      updateUser: (user: User) => {
        set((state) => {
          state.user = user;
        });
      },
    })),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
