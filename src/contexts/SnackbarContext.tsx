import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface SnackbarContextType {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
  showConfirm: (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => void;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
  showConfirmActions?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

interface SnackbarProviderProps {
  children: ReactNode;
  snackbarState: SnackbarState;
  setSnackbarState: React.Dispatch<React.SetStateAction<SnackbarState>>;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
  snackbarState,
  setSnackbarState,
}) => {
  const showMessage = (
    message: string,
    severity: SnackbarState["severity"]
  ) => {
    setSnackbarState({
      open: true,
      message,
      severity,
      showConfirmActions: false,
    });
  };

  const showSuccess = (message: string) => showMessage(message, "success");
  const showError = (message: string) => showMessage(message, "error");
  const showWarning = (message: string) => showMessage(message, "warning");
  const showInfo = (message: string) => showMessage(message, "info");

  const showConfirm = (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    setSnackbarState({
      open: true,
      message,
      severity: "warning",
      showConfirmActions: true,
      onConfirm,
      onCancel,
    });
  };

  return (
    <SnackbarContext.Provider
      value={{
        showSuccess,
        showError,
        showWarning,
        showInfo,
        showConfirm,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};
