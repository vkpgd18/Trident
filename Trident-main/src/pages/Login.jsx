import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const REACT_APP_GOOGLE_CLIENT_ID= "411571053593-fb4h3tfkin4qgfogp2st1o3o0fmnler1.apps.googleusercontent.com"

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/token",
        new URLSearchParams({
          username: formData.username,
          password: formData.password
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );

      localStorage.setItem("access_token", response.data.access_token);
      navigate("/discussions");

    } catch (err) {
      setError(err.response?.data?.detail || "Login failed. Please try again.");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/google",
        { token: credentialResponse.credential }
      );
      
      localStorage.setItem("access_token", response.data.access_token);
      navigate("/discussions");
    } catch (error) {
      setError(error.response?.data?.detail || "Google login failed");
    }
  };

  return (
    <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
      <Container className="d-flex align-items-center justify-content-center vh-100">
        <div className="p-4 shadow-lg bg-white rounded" style={{ width: "400px" }}>
          <h3 className="text-center mb-3">Sign In</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <div className="text-center mb-3">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setError("Google login failed")}
              useOneTap
            />
          </div>

          <div className="separator mb-3">
            <span className="text-muted">or</span>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Sign In
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>
              New User? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </Container>
    </GoogleOAuthProvider>
  );
}

export default Login;