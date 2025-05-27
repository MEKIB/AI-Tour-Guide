import React, { useState } from "react";
import { Box, Typography, TextField, Button, Container, Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const VerifyEmailUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:2000/api/verify-email-user", {
        email,
        code,
      });
      setLoading(false);
      alert(response.data.message);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Verification failed");
    }
  };

  if (!email) {
    navigate("/signup");
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background: `linear-gradient(135deg, ${colors.background}, ${colors.secondary})`,
          color: colors.text,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              p: 4,
              borderRadius: 4,
              boxShadow: 3,
              background: `linear-gradient(145deg, ${colors.secondary}, ${colors.background})`,
              color: colors.text,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold", mb: 4, color: colors.primary }}
            >
              Verify Your Email
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              A verification code has been sent to <strong>{email}</strong>. Please enter it below.
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 3, width: "100%" }}>
                {error}
              </Alert>
            )}
            <Box component="form" onSubmit={handleVerify} sx={{ width: "100%" }}>
              <TextField
                label="Verification Code"
                variant="outlined"
                fullWidth
                value={code}
                onChange={(e) => setCode(e.target.value)}
                sx={{ mb: 3 }}
                InputProps={{
                  style: { color: colors.text },
                  sx: { bgcolor: colors.secondary, borderRadius: 1 },
                }}
                InputLabelProps={{ style: { color: colors.text } }}
                required
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  bgcolor: colors.primary,
                  color: colors.text,
                  "&:hover": { bgcolor: "#0097A7" },
                  fontWeight: "bold",
                  fontSize: "1rem",
                  py: 2,
                }}
              >
                {loading ? "Verifying..." : "Verify"}
              </Button>
              <Button
                fullWidth
                sx={{ mt: 2, color: colors.primary }}
                onClick={() => navigate("/signup")}
              >
                Back to Sign Up
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default VerifyEmailUser;