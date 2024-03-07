import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import {API_BASE_URL} from "../../api"



export default function SignIn() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const saveTokenInLocalStr = (token) => {
    localStorage.setItem("token", token);
    console.log("Token saved:", token);
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${API_BASE_URL}login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success === true) {
        const responseData = response.data;
        console.log("after login: ", responseData);
        
        if (responseData.user.role === "admin") {
          saveTokenInLocalStr(responseData.user.token);
          setUser({ email: "", password: "" });
          navigate("/");
        } else {
          // Non-admin user login
          alert("You are not an admin. Please log in as an admin.");
        }
      } else {
        // Unsuccessful login
        alert("Incorrect email or password. Please try again.");
      }
  
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box   sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box>
          <form onSubmit={handleLogin}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="email"
                  label="Email Address"
                  value={user.email}
                  onChange={handleInput}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  name="password"
                  label="Password"
                  value={user.password}
                  onChange={handleInput}
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary">
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Container>
  );
}
