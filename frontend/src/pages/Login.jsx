import { Box, TextField, Button, Typography, Link as MuiLink } from "@mui/material";
import { useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    api.post("/auth/login", form)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("token", res.data.user.token);
          // Hard reload to initialize app with token
          window.location.href = "/";
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Login failed");
      });
  };

  return (
    <Box sx={{ bgcolor: "#000", minHeight: "100vh", color: "#fff", p: 3, maxWidth: 420, mx: "auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Welcome Back 👋</Typography>
      <Typography sx={{ color: "#aaa", mb: 4 }}>Login to spread happiness</Typography>

      {error && <Typography sx={{ color: "#FF6129", mb: 2 }}>{error}</Typography>}

      <TextField 
        fullWidth label="Email" name="email" type="email" onChange={handleChange} sx={{ mb: 2 }}
        InputLabelProps={{ style: { color: "#aaa" } }}
        InputProps={{ style: { color: "#fff" }, sx: { "& fieldset": { borderColor: "#333" }, "&:hover fieldset": { borderColor: "#FF6129" }, "&.Mui-focused fieldset": { borderColor: "#FF6129" } } }}
      />
      
      <TextField 
        fullWidth label="Password" name="password" type="password" onChange={handleChange} sx={{ mb: 4 }}
        InputLabelProps={{ style: { color: "#aaa" } }}
        InputProps={{ style: { color: "#fff" }, sx: { "& fieldset": { borderColor: "#333" }, "&:hover fieldset": { borderColor: "#FF6129" }, "&.Mui-focused fieldset": { borderColor: "#FF6129" } } }}
      />

      <Button fullWidth onClick={handleSubmit} sx={{ background: "linear-gradient(45deg,#FF6129,#FC3B00)", color: "#fff", py: 1.5, borderRadius: "12px", mb: 3 }}>
        Login
      </Button>

      <Typography align="center" sx={{ color: "#aaa" }}>
        Don't have an account?{" "}
        <MuiLink component={Link} to="/register" sx={{ color: "#FF6129", textDecoration: "none" }}>
          Sign up
        </MuiLink>
      </Typography>
    </Box>
  );
}
