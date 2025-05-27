import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Avatar,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  LinearProgress,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Description,
  Lock,
  CreditCard,
  Notifications,
  Flight,
  Settings,
  Edit,
  Delete,
  Password,
  ArrowBack,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import axios from 'axios';

const colors = {
  primary: '#00ADB5',
  secondary: '#393E46',
  background: '#222831',
  text: '#EEEEEE',
};

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editField, setEditField] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    passportOrId: null,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    showNewPassword: false,
    showConfirmPassword: false,
  });
  const [validation, setValidation] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasUpperCase: false,
    hasLowerCase: false,
    passwordsMatch: false,
  });
  const [filePreview, setFilePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          showSnackbar('Please log in to view your profile', 'error');
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:2000/api/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = response.data;
        setUser(userData);
        setFormData({
          firstName: userData.firstName || '',
          middleName: userData.middleName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phone: userData.phone || '',
          passportOrId: null,
        });
        if (userData.passportOrId && userData.passportOrId.startsWith('http')) {
          setFilePreview(userData.passportOrId);
        }
      } catch (error) {
        console.error('Fetch error:', error.response?.data, error.message);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          showSnackbar('Session expired. Please log in again.', 'error');
          navigate('/login');
        } else {
          showSnackbar(error.response?.data?.message || 'Failed to fetch user data', 'error');
        }
      }
    };
    fetchUser();
  }, [navigate]);

  const validatePassword = (password, confirmPassword) => {
    const newValidation = {
      minLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      passwordsMatch: password === confirmPassword && password !== '',
    };
    setValidation(newValidation);
    return newValidation;
  };

  const handleEditClick = (field) => {
    setEditField(field);
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    if (name === 'passportOrId' && files) {
      const file = files[0];
      if (file) {
        setFilePreview(file.type.startsWith('image/') ? URL.createObjectURL(file) : null);
      }
    }

    if (name === 'newPassword' || name === 'confirmPassword') {
      validatePassword(
        name === 'newPassword' ? value : passwordData.newPassword,
        name === 'confirmPassword' ? value : passwordData.confirmPassword
      );
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === 'newPassword' || name === 'confirmPassword') {
      validatePassword(
        name === 'newPassword' ? value : passwordData.newPassword,
        name === 'confirmPassword' ? value : passwordData.confirmPassword
      );
    }
  };

  const getStrengthColor = () => {
    const strength = Object.values(validation).filter(Boolean).length;
    if (strength < 2) return 'error';
    if (strength < 4) return 'warning';
    return 'success';
  };

  const handleSave = async () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex = /^\+?[0-9]{7,15}$/;

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Invalid phone number';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          showSnackbar('Please log in to update your profile', 'error');
          navigate('/login');
          return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('firstName', formData.firstName);
        formDataToSend.append('middleName', formData.middleName);
        formDataToSend.append('lastName', formData.lastName);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        if (formData.passportOrId) {
          formDataToSend.append('passportOrId', formData.passportOrId);
        }

        const response = await axios.put('http://localhost:2000/api/me', formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setUser(response.data);
        setFilePreview(response.data.passportOrId && response.data.passportOrId.startsWith('http') ? response.data.passportOrId : null);
        showSnackbar('Profile updated successfully!', 'success');
        setEditField(null);
      } catch (error) {
        console.error('Update error:', error.response?.data, error.message);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          showSnackbar('Session expired. Please log in again.', 'error');
          navigate('/login');
        } else {
          showSnackbar(error.response?.data?.message || 'Failed to update profile', 'error');
        }
      }
    }
  };

  const handleUpdatePassword = async () => {
    const passwordValid = Object.values(validation).every(Boolean);
    if (!passwordValid) {
      showSnackbar('New password does not meet requirements', 'error');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showSnackbar('New passwords do not match!', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showSnackbar('Please log in to update your password', 'error');
        navigate('/login');
        return;
      }

      await axios.post(
        'http://localhost:2000/api/change-password',
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPasswordDialogOpen(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        showNewPassword: false,
        showConfirmPassword: false,
      });
      setValidation({
        minLength: false,
        hasNumber: false,
        hasSpecialChar: false,
        hasUpperCase: false,
        hasLowerCase: false,
        passwordsMatch: false,
      });
      showSnackbar('Password updated successfully!', 'success');
    } catch (error) {
      console.error('Password update error:', error.response?.data, error.message);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        showSnackbar('Session expired. Please log in again.', 'error');
        navigate('/login');
      } else {
        showSnackbar(error.response?.data?.message || 'Failed to update password', 'error');
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showSnackbar('Please log in to delete your account', 'error');
        navigate('/login');
        return;
      }

      await axios.delete('http://localhost:2000/api/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('token');
      setDeleteDialogOpen(false);
      showSnackbar('Account deleted successfully!', 'info');
      navigate('/login');
    } catch (error) {
      console.error('Delete account error:', error.response?.data, error.message);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        showSnackbar('Session expired. Please log in again.', 'error');
        navigate('/login');
      } else {
        showSnackbar(error.response?.data?.message || 'Failed to delete account', 'error');
      }
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const menuItems = [
    { icon: <Person />, text: 'Personal information' },
    { icon: <Lock />, text: 'Login & Security' },
    { icon: <CreditCard />, text: 'Payment methods' },
    { icon: <Notifications />, text: 'Communication preferences' },
    { icon: <Flight />, text: 'Travel preferences' },
    { icon: <Settings />, text: 'Site preferences' },
  ];

  return (
    <Box sx={{ 
      backgroundColor: colors.background,
      minHeight: '100vh',
      padding: { xs: 2, md: 4 },
      color: colors.text,
    }}>
      <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ color: colors.primary, mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: colors.primary }}>
            My Profile
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Card sx={{ 
            backgroundColor: colors.secondary,
            borderRadius: 2,
            width: { xs: '100%', md: 280 },
            height: 'fit-content',
          }}>
            <List>
              {menuItems.map((item, index) => (
                <React.Fragment key={item.text}>
                  <ListItem button sx={{ '&:hover': { backgroundColor: 'rgba(0, 173, 181, 0.1)' } }}>
                    <ListItemIcon sx={{ color: colors.primary, minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text} 
                      primaryTypographyProps={{ 
                        sx: { 
                          color: colors.text,
                          fontWeight: item.text === 'Personal information' ? 'bold' : 'normal',
                        } 
                      }} 
                    />
                  </ListItem>
                  {index < menuItems.length - 1 && <Divider sx={{ backgroundColor: '#555' }} />}
                </React.Fragment>
              ))}
            </List>
          </Card>

          <Box sx={{ flex: 1 }}>
            <Card sx={{ backgroundColor: colors.secondary, borderRadius: 2, mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: colors.primary }}>
                    Personal Information
                  </Typography>
                  <Avatar
                    sx={{
                      bgcolor: colors.primary,
                      width: 56,
                      height: 56,
                      fontSize: '1.5rem',
                    }}
                  >
                    {formData.firstName && formData.lastName
                      ? `${formData.firstName[0]}${formData.lastName[0]}`
                      : 'UA'}
                  </Avatar>
                </Box>

                {[
                  { field: 'firstName', label: 'First Name', icon: <Person />, readOnly: false },
                  { field: 'middleName', label: 'Middle Name', icon: <Person />, readOnly: false },
                  { field: 'lastName', label: 'Last Name', icon: <Person />, readOnly: false },
                  { field: 'email', label: 'Email', icon: <Email />, readOnly: true },
                  { field: 'phone', label: 'Phone Number', icon: <Phone />, readOnly: false },
                ].map(({ field, label, icon, readOnly }) => (
                  <Box
                    key={field}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2,
                      p: 2,
                      backgroundColor: 'rgba(0, 173, 181, 0.05)',
                      borderRadius: 1,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      <Box sx={{ color: colors.primary, mr: 2 }}>{icon}</Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" sx={{ color: '#AAAAAA' }}>
                          {label}
                        </Typography>
                        {editField === field ? (
                          <TextField
                            value={formData[field] || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name={field}
                            variant="standard"
                            fullWidth
                            error={!!errors[field] && touched[field]}
                            helperText={touched[field] && errors[field]}
                            sx={{ mt: 1, '& .MuiInput-input': { color: colors.text } }}
                          />
                        ) : (
                          <Typography>{formData[field] || 'Not provided'}</Typography>
                        )}
                      </Box>
                    </Box>
                    {!readOnly && (editField === field ? (
                      <Button onClick={handleSave} sx={{ color: colors.primary, ml: 2 }}>
                        Save
                      </Button>
                    ) : (
                      <IconButton onClick={() => handleEditClick(field)} sx={{ color: colors.primary }}>
                        <Edit />
                      </IconButton>
                    ))}
                  </Box>
                ))}

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    p: 2,
                    backgroundColor: 'rgba(0, 173, 181, 0.05)',
                    borderRadius: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    <Box sx={{ color: colors.primary, mr: 2 }}><Description /></Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" sx={{ color: '#AAAAAA' }}>
                        Passport / ID
                      </Typography>
                      {editField === 'passportOrId' ? (
                        <>
                          <TextField
                            type="file"
                            name="passportOrId"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            inputProps={{ accept: 'image/*,application/pdf' }}
                            fullWidth
                            sx={{ mt: 1 }}
                          />
                          {touched.passportOrId && errors.passportOrId && (
                            <FormHelperText error>{errors.passportOrId}</FormHelperText>
                          )}
                        </>
                      ) : (
                        <Typography>
                          {formData.passportOrId?.name || (user?.passportOrId ? 'File uploaded' : 'Not provided')}
                        </Typography>
                      )}
                      {filePreview && (
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                          {filePreview.startsWith('blob:') || filePreview.includes('image') ? (
                            <img
                              src={filePreview}
                              alt="Passport/ID Preview"
                              style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px' }}
                            />
                          ) : (
                            <Typography variant="body2" sx={{ color: colors.primary }}>
                              File: {formData.passportOrId?.name || user?.passportOrId}
                            </Typography>
                          )}
                        </Box>
                      )}
                    </Box>
                  </Box>
                  {editField === 'passportOrId' ? (
                    <Button onClick={handleSave} sx={{ color: colors.primary, ml: 2 }}>
                      Save
                    </Button>
                  ) : (
                    <IconButton onClick={() => handleEditClick('passportOrId')} sx={{ color: colors.primary }}>
                      <Edit />
                    </IconButton>
                  )}
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    p: 2,
                    backgroundColor: 'rgba(0, 173, 181, 0.05)',
                    borderRadius: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    <Box sx={{ color: colors.primary, mr: 2 }}><Lock /></Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" sx={{ color: '#AAAAAA' }}>
                        Password
                      </Typography>
                      <Typography>
                        For security reasons, your password cannot be displayed.
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    onClick={() => setPasswordDialogOpen(true)}
                    sx={{ color: colors.primary, ml: 2 }}
                  >
                    Change
                  </Button>
                </Box>

                <Box sx={{ mt: 4 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Password />}
                    onClick={() => setPasswordDialogOpen(true)}
                    sx={{
                      color: colors.primary,
                      borderColor: colors.primary,
                      mr: 2,
                      '&:hover': {
                        borderColor: colors.primary,
                        backgroundColor: 'rgba(0, 173, 181, 0.1)',
                      },
                    }}
                  >
                    Change Password
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Delete />}
                    onClick={() => setDeleteDialogOpen(true)}
                    sx={{
                      color: '#ff5252',
                      borderColor: '#ff5252',
                      '&:hover': {
                        borderColor: '#ff5252',
                        backgroundColor: 'rgba(255, 82, 82, 0.1)',
                      },
                    }}
                  >
                    Delete Account
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>

      <Dialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)}>
        <DialogTitle sx={{ color: colors.primary }}>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Current Password"
            type="password"
            fullWidth
            variant="outlined"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="New Password"
            type={passwordData.showNewPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            onBlur={handleBlur}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setPasswordData((prev) => ({
                        ...prev,
                        showNewPassword: !prev.showNewPassword,
                      }))
                    }
                  >
                    {passwordData.showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ mt: 2, mb: 2 }}>
            <LinearProgress
              variant="determinate"
              value={Object.values(validation).filter(Boolean).length * 20}
              color={getStrengthColor()}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Box sx={{ mt: 1, pl: 1 }}>
              <Typography variant="caption" color={validation.minLength ? 'success.main' : 'error.main'}>
                ✓ 8+ characters
              </Typography>
              <Typography variant="caption" display="block" color={validation.hasUpperCase ? 'success.main' : 'error.main'}>
                ✓ Uppercase letter
              </Typography>
              <Typography variant="caption" display="block" color={validation.hasLowerCase ? 'success.main' : 'error.main'}>
                ✓ Lowercase letter
              </Typography>
              <Typography variant="caption" display="block" color={validation.hasNumber ? 'success.main' : 'error.main'}>
                ✓ Number
              </Typography>
              <Typography variant="caption" display="block" color={validation.hasSpecialChar ? 'success.main' : 'error.main'}>
                ✓ Special character
              </Typography>
            </Box>
          </Box>
          <TextField
            margin="dense"
            label="Confirm New Password"
            type={passwordData.showConfirmPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            onBlur={handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setPasswordData((prev) => ({
                        ...prev,
                        showConfirmPassword: !prev.showConfirmPassword,
                      }))
                    }
                  >
                    {passwordData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ mt: 2, pl: 1 }}>
            <Typography variant="caption" color={validation.passwordsMatch ? 'success.main' : 'error.main'}>
              {validation.passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialogOpen(false)} sx={{ color: colors.text }}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdatePassword}
            sx={{ color: colors.primary }}
            disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle sx={{ color: '#ff5252' }}>Delete Account</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your account? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} sx={{ color: colors.text }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteAccount} sx={{ color: '#ff5252' }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;