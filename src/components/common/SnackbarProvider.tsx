import React, { useState } from "react";
import { Snackbar, Alert, type AlertColor, Button, Box } from "@mui/material";
import { SnackbarProvider as SnackbarContextProvider } from "../../contexts/SnackbarContext";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
  showConfirmActions?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface SnackbarComponentProps {
  snackbarState: SnackbarState;
  setSnackbarState: React.Dispatch<React.SetStateAction<SnackbarState>>;
}

const SnackbarComponent: React.FC<SnackbarComponentProps> = ({
  snackbarState,
  setSnackbarState,
}) => {
  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarState((prev) => ({ ...prev, open: false }));
  };

  const handleConfirm = () => {
    if (snackbarState.onConfirm) {
      snackbarState.onConfirm();
    }
    handleClose();
  };

  const handleCancel = () => {
    if (snackbarState.onCancel) {
      snackbarState.onCancel();
    }
    handleClose();
  };

  return (
    <Snackbar
      open={snackbarState.open}
      autoHideDuration={snackbarState.showConfirmActions ? null : 6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarState.severity}
        variant="filled"
        sx={{ width: "100%" }}
        action={
          snackbarState.showConfirmActions ? (
            <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
              <Button
                color="inherit"
                size="small"
                onClick={handleConfirm}
                sx={{ fontWeight: "bold" }}
              >
                Confirmar
              </Button>
              <Button
                color="inherit"
                size="small"
                onClick={handleCancel}
                variant="outlined"
                sx={{
                  borderColor: "currentColor",
                  "&:hover": {
                    borderColor: "currentColor",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Cancelar
              </Button>
            </Box>
          ) : undefined
        }
      >
        {snackbarState.message}
      </Alert>
    </Snackbar>
  );
};

interface GlobalSnackbarProviderProps {
  children: React.ReactNode;
}

export const GlobalSnackbarProvider: React.FC<GlobalSnackbarProviderProps> = ({
  children,
}) => {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
    showConfirmActions: false,
  });

  return (
    <SnackbarContextProvider
      snackbarState={snackbarState}
      setSnackbarState={setSnackbarState}
    >
      {children}
      <SnackbarComponent
        snackbarState={snackbarState}
        setSnackbarState={setSnackbarState}
      />
    </SnackbarContextProvider>
  );
};
