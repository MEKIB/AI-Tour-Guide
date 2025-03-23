import React, { useState } from "react";
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
import { Lock } from "@mui/icons-material"; // Import icons

// Define the color palette for dark theme
const colors = {
  primary: "#00ADB5", // Teal
  secondary: "#393E46", // Medium gray
  background: "#222831", // Dark gray
  text: "#EEEEEE", // Light gray
};

// Custom dark theme for consistent styling
const theme = createTheme({
  palette: {
    mode: "dark", // Enable dark mode
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.background,
      paper: colors.secondary,
    },
    text: {
      primary: colors.text,
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h4: {
      fontWeight: 600,
      color: colors.text,
    },
  },
});

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token } = useParams(); // Get the token from the URL

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
      const response = await axios.post(
        `http://localhost:2000/reset-password/${token}`,
        {
          password: password,
        }
      );
      setMessage(response.data.message);
      // Optionally, navigate to the login page after successful reset
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      setError(err.response?.data.message || "An error occurred.");
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

              {/* Success and Error Messages */}
              {message && (
                <Typography color="success" align="center" sx={{ mb: 2 }}>
                  {message}
                </Typography>
              )}
              {error && (
                <Typography color="error" align="center" sx={{ mb: 2 }}>
                  {error}
                </Typography>
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
                  disabled={loading}
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

      {/* Snackbar for Success and Error Messages */}
      <Snackbar
        open={!!message}
        autoHideDuration={3000}
        onClose={() => setMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {message}
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