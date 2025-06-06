import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../ContextPage/MyContext";

import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();  //prevents page from  refresh after form submit.
    try {
      if (isSignup) {
        const res = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          alert("Signup successful! Please log in.");
          setIsSignup(false);  //switched to login now
        } else {
          alert("Try again");
        }
      } else {
        const res = await fetch(  //it is fetching after matching email
          `http://localhost:3001/login?email=${formData.email}`
        );
        const users = await res.json();
        const user = users.find((u) => u.password === formData.password);
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          navigate("/");
        } else {
          alert("Invalid credentials.");
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(credentialResponse);
    const user = {
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };

    try {
      const checkRes = await fetch(`http://localhost:3001/login?id=${user.id}`);
      const existingUsers = await checkRes.json();
      if (existingUsers.length === 0) {
        await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
        console.log("User saved to db.json");
      }

      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  return (
    <GoogleOAuthProvider clientId="575735354732-a1phvefjqu6a2kulnrp0c659ck10inmh.apps.googleusercontent.com">
      <Box className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-white px-4">
        <Paper elevation={3} sx={{ padding: 4, width: 360 }}>
          <Typography variant="h5" align="center" gutterBottom>
            {isSignup ? "Create Account" : "Welcome! Please Sign In"}
          </Typography>

          <form onSubmit={handleFormSubmit}>
            {isSignup && (
              <TextField
                label="Name"
                name="name"
                fullWidth
                margin="normal"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            )}
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              {isSignup ? "Sign Up" : "Log In"}
            </Button>
          </form>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link
              href="#"
              onClick={() => setIsSignup((prev) => !prev)}
              underline="hover"
            >
              {isSignup ? "Log in" : "Sign up"}
            </Link>
          </Typography>

          <Box mt={4}>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => console.error("Google Login Failed")}
            />
          </Box>
        </Paper>
      </Box>
    </GoogleOAuthProvider>
  );
};

export default Login;
