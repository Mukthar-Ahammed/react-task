import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "test@example.com" && password === "password123") {
      navigate("/treatments"); 
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #141E30, #243B55)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: 350,
          borderRadius: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={600}
          gutterBottom
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ borderRadius: 2, fontWeight: 600 }}
            >
              Login
            </Button>
          </Stack>
        </form>

        {error && (
          <Typography color="error" textAlign="center" mt={2}>
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default LoginPage;