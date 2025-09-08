import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './pages/LoginPage';
import TreatmentListPage from './pages/TreatmentListPage';

export default function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login', { replace: true });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar sx={{ gap: 2 }}>
          <Typography
            variant="h6"
            fontWeight={800}
            component={Link}
            to="/"
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            Treatment Manager
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Button onClick={handleLogout} variant="outlined">
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 3 }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/treatments" element={<TreatmentListPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Typography>Not Found</Typography>} />
        </Routes>
      </Container>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </Box>
  );
}