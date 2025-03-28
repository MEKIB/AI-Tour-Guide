import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Alert,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Grid,
  LinearProgress,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Snackbar,
  CssBaseline,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Email, Lock, Person, Phone, Description } from "@mui/icons-material";

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

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    passportOrId: null,
    showPassword: false,
    showConfirmPassword: false,
    acceptedTerms: false,
  });

  const [alert, setAlert] = useState(null);
  const [validation, setValidation] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasUpperCase: false,
    hasLowerCase: false,
    passwordsMatch: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const validatePassword = (password, confirmPassword) => {
    const newValidation = {
      minLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      passwordsMatch: password === confirmPassword && password !== "",
    };
    setValidation(newValidation);
    return newValidation;
  };

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));

    if (name === "password" || name === "confirmPassword") {
      validatePassword(
        name === "password" ? value : formData.password,
        name === "confirmPassword" ? value : formData.confirmPassword
      );
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const getStrengthColor = () => {
    const strength = Object.values(validation).filter(Boolean).length;
    if (strength < 2) return "error";
    if (strength < 4) return "warning";
    return "success";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex = /^\+?[0-9]{7,15}$/;

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";
    if (!phoneRegex.test(formData.phone)) newErrors.phone = "Invalid phone number";
    if (!formData.passportOrId) newErrors.passportOrId = "Passport or ID is required";
    if (!formData.acceptedTerms) newErrors.acceptedTerms = "You must accept the terms";

    const passwordValid = Object.values(validation).every(Boolean);
    if (!passwordValid) newErrors.password = "Password does not meet requirements";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("firstName", formData.firstName);
        formDataToSend.append("middleName", formData.middleName);
        formDataToSend.append("lastName", formData.lastName);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("confirmPassword", formData.confirmPassword);
        formDataToSend.append("passportOrId", formData.passportOrId);
        formDataToSend.append("acceptedTerms", formData.acceptedTerms);

        const response = await fetch("http://localhost:2000/register", {
          method: "POST",
          body: formDataToSend,
        });

        const data = await response.json();

        if (response.ok) {
          setAlert({ type: "success", message: "Registration successful!" });
          localStorage.setItem("token", data.token); // Store JWT token
          setTimeout(() => navigate("/home"), 2000); // Redirect after 2 seconds
        } else {
          setAlert({ type: "error", message: data.message || "Registration failed" });
        }
      } catch (error) {
        setAlert({ type: "error", message: "Server error. Please try again later." });
      }
    }
    setLoading(false);
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
        <Container maxWidth="md">
          <Box
            sx={{
              p: 4,
              borderRadius: 4,
              boxShadow: 3,
              background: `linear-gradient(145deg, ${colors.secondary}, ${colors.background})`,
              color: colors.text,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              align="center"
              sx={{ mb: 4, color: colors.primary, fontWeight: 600 }}
            >
              Create Account
            </Typography>

            {alert && (
              <Alert severity={alert.type} sx={{ mb: 2 }}>
                {alert.message}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.firstName && touched.firstName}
                    helperText={touched.firstName && errors.firstName}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: <Person sx={{ color: colors.text, mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Middle Name"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: <Person sx={{ color: colors.text, mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.lastName && touched.lastName}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: <Person sx={{ color: colors.text, mr: 1 }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.email && touched.email}
                    helperText={touched.email && errors.email}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: <Email sx={{ color: colors.text, mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.phone && touched.phone}
                    helperText={touched.phone && errors.phone}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: <Phone sx={{ color: colors.text, mr: 1 }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={formData.showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.password && touched.password}
                    InputProps={{
                      startAdornment: <Lock sx={{ color: colors.text, mr: 1 }} />,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                showPassword: !prev.showPassword,
                              }))
                            }
                          >
                            {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />
                  <Box sx={{ mt: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={Object.values(validation).filter(Boolean).length * 20}
                      color={getStrengthColor()}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                    <Box sx={{ mt: 1, pl: 1 }}>
                      <Typography variant="caption" color={validation.minLength ? "success.main" : "error.main"}>
                        ✓ 8+ characters
                      </Typography>
                      <Typography variant="caption" display="block" color={validation.hasUpperCase ? "success.main" : "error.main"}>
                        ✓ Uppercase letter
                      </Typography>
                      <Typography variant="caption" display="block" color={validation.hasLowerCase ? "success.main" : "error.main"}>
                        ✓ Lowercase letter
                      </Typography>
                      <Typography variant="caption" display="block" color={validation.hasNumber ? "success.main" : "error.main"}>
                        ✓ Number
                      </Typography>
                      <Typography variant="caption" display="block" color={validation.hasSpecialChar ? "success.main" : "error.main"}>
                        ✓ Special character
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type={formData.showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.password && touched.confirmPassword}
                    InputProps={{
                      startAdornment: <Lock sx={{ color: colors.text, mr: 1 }} />,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                showConfirmPassword: !prev.showConfirmPassword,
                              }))
                            }
                          >
                            {formData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />
                  <Box sx={{ mt: 2, pl: 1 }}>
                    <Typography variant="caption" color={validation.passwordsMatch ? "success.main" : "error.main"}>
                      {validation.passwordsMatch ? "✓ Passwords match" : "✗ Passwords do not match"}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ color: colors.text, mb: 1 }}>
                      Passport / ID (Image or PDF)
                    </Typography>
                    <TextField
                      fullWidth
                      type="file"
                      name="passportOrId"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.passportOrId && touched.passportOrId}
                      helperText={touched.passportOrId && errors.passportOrId}
                      inputProps={{ accept: "image/*, application/pdf" }}
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: <Description sx={{ color: colors.text, mr: 1 }} />,
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="acceptedTerms"
                        checked={formData.acceptedTerms}
                        onChange={handleChange}
                        sx={{ color: colors.primary }}
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I accept the{" "}
                        <a
                          href="https://example.com/terms"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: colors.primary, textDecoration: "none" }}
                        >
                          Terms and Conditions
                        </a>
                      </Typography>
                    }
                  />
                  {errors.acceptedTerms && (
                    <FormHelperText error>{errors.acceptedTerms}</FormHelperText>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    type="submit"
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
                    {loading ? "Signing Up..." : "Sign Up"}
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" align="center" sx={{ color: colors.text }}>
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      style={{
                        color: colors.primary,
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      Log in
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </Box>

      <Snackbar
        open={!!alert}
        autoHideDuration={3000}
        onClose={() => setAlert(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={alert?.type} sx={{ width: "100%" }}>
          {alert?.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default SignupPage;