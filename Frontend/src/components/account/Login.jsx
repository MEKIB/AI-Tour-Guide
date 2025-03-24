import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  CssBaseline,
  Snackbar,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import { Email, Lock } from "@mui/icons-material";

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

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:2000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Login successful!");
        localStorage.setItem("token", data.token); // Store JWT token
        onLogin(); // Call the onLogin function passed from App.jsx
        setTimeout(() => navigate("/"), 2000); // Redirect to home page after 2 seconds
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
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
                Login
              </Typography>
              <form onSubmit={handleLogin}>
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
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 3 }}
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
                  {loading ? "Logging In..." : "Login"}
                </Button>
              </form>

              {/* "Forgot Password" Link */}
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: colors.text }}>
                  <Link
                    to="/forgot-password"
                    style={{
                      color: colors.primary,
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    Forgot Password?
                  </Link>
                </Typography>
              </Box>

              {/* "Don't have an account? Sign up" Link */}
              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: colors.text }}>
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    style={{
                      color: colors.primary,
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Success and Error Messages */}
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {success}
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

export default LoginPage;