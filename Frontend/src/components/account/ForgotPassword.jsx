import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link here
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  CssBaseline,
  Snackbar,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Email } from "@mui/icons-material"; // Import icons

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

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:2000/forgot-password", {
        email: email,
      });
      setMessage(response.data.message); // Display success message
    } catch (err) {
      setError(err.response?.data.message || "An error occurred."); // Display error message
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
                Forgot Password
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
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: <Email sx={{ color: colors.text, mr: 1 }} />,
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
                  {loading ? <CircularProgress size={24} /> : "Send Reset Link"}
                </Button>
              </form>

              {/* Back to Login Link */}
              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: colors.text }}>
                  Remember your password?{" "}
                  <Link
                    to="/login"
                    style={{
                      color: colors.primary,
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    Login
                  </Link>
                </Typography>
              </Box>
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

export default ForgotPasswordPage;