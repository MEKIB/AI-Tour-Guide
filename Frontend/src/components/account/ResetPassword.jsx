import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  CssBaseline,
  Snackbar,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Lock } from "@mui/icons-material";

// Define the color palette for dark theme
const colors = {
  primary: "#00ADB5",
  secondary: "#393E46",
  background: "#222831",
  text: "#EEEEEE",
};

// Custom dark theme for consistent styling
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
    background: { default: colors.background, paper: colors.secondary },
    text: { primary: colors.text },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h4: { fontWeight: 600, color: colors.text },
  },
});

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    console.log('ResetPasswordPage: Token from URL:', token);
    if (!token) {
      setError("No reset token provided. Please request a new password reset link.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      console.log('ResetPasswordPage: Sending reset request for token:', token);
      const response = await axios.post(
        `http://localhost:2000/reset-password/${token}`,
        { password }
      );
      setMessage(response.data.message);
      setTimeout(() => {
        console.log('ResetPasswordPage: Redirecting to /login');
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error('ResetPasswordPage: Error:', err);
      setError(err.response?.data.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          background: `linear-gradient(135deg, ${colors.background}, ${colors.secondary})`,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Container maxWidth="sm">
          <Card
            sx={{
              width: "100%",
              maxWidth: 500,
              p: 4,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              background: `linear-gradient(145deg, ${colors.secondary}, ${colors.background})`,
            }}
          >
            <CardContent>
              <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
                Reset Password
              </Typography>

              {message && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {message} Redirecting to login...
                </Alert>
              )}
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  label="New Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: <Lock sx={{ color: colors.text, mr: 1 }} />,
                  }}
                />
                <TextField
                  label="Confirm New Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: <Lock sx={{ color: colors.text, mr: 1 }} />,
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  disabled={loading || !token}
                  sx={{
                    mt: 2,
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                    borderRadius: 2,
                    background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                    "&:hover": {
                      transform: "scale(1.02)",
                      transition: "transform 0.2s",
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : "Reset Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>

      <Snackbar
        open={!!message}
        autoHideDuration={3000}
        onClose={() => setMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {message} Redirecting to login...
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default ResetPasswordPage;