import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { ChatBubbleOutline } from "@mui/icons-material";
import { useSignIn } from "../../hooks/auth/useAuth";
import { env } from "../../config/env";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("santi@gmail.com");
  const [password, setPassword] = useState("Password1234");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const signIn = useSignIn();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      signIn.mutate({ email, password });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%" }}>
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
              <ChatBubbleOutline />
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom>
              Sign in to {env.APP_NAME}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Enter your credentials to access the chatbot
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email address"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              required
            />

            {signIn.error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                Failed to sign in. Please check your credentials and try again.
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={signIn.isPending}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              startIcon={
                signIn.isPending ? <CircularProgress size={20} /> : null
              }
            >
              {signIn.isPending ? "Signing in..." : "Sign in"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
