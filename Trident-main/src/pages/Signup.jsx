import React, { useState } from "react";
import { Container, Form, Button, Alert, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const REACT_APP_GOOGLE_CLIENT_ID= "411571053593-fb4h3tfkin4qgfogp2st1o3o0fmnler1.apps.googleusercontent.com"

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    agree: false,
  });
  const [errors, setErrors] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    if (!formData.username.includes("@") || !formData.username.includes(".")) {
      setErrors("Invalid email format!");
      return false;
    }
    if (formData.password.length < 8) {
      setErrors("Password must be at least 8 characters long!");
      return false;
    }
    if (!formData.agree) {
      setErrors("You must agree to the Terms and Conditions!");
      return false;
    }
    setErrors("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/register",
        {
          username: formData.username,
          password: formData.password
        }
      );

      if (response.status === 200) {
        setShowModal(true);
      }
    } catch (error) {
      if (error.response?.data?.detail) {
        setErrors(error.response.data.detail);
      } else {
        setErrors("Registration failed. Please try again.");
      }
    }
  };

  const handleGoogleSignup = async (credentialResponse) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/google",
        { token: credentialResponse.credential }
      );
      
      localStorage.setItem("access_token", response.data.access_token);
      navigate("/discussions");
    } catch (error) {
      setErrors(error.response?.data?.detail || "Google signup failed");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
      <Container className="d-flex align-items-center justify-content-center vh-100">
        <div className="p-4 shadow-lg bg-white rounded" style={{ width: "400px" }}>
          <h3 className="text-center mb-3">Sign Up</h3>
          {errors && <Alert variant="danger">{errors}</Alert>}

          <div className="text-center mb-3">
            <GoogleLogin
              onSuccess={handleGoogleSignup}
              onError={() => setErrors("Google signup failed")}
              useOneTap
            />
          </div>

          <div className="separator mb-3">
            <span className="text-muted">or</span>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="username"
                placeholder="Enter your email"
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

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="agree"
                label="I agree to the Terms and Conditions"
                checked={formData.agree}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Sign Up
            </Button>
          </Form>
        </div>

        <Modal show={showModal} onHide={handleModalClose} centered>
          <Modal.Body className="text-center">
            <h4>Signed Up Successfully! ✅</h4>
            <p>You will now be redirected to the Sign-In page.</p>
            <Button variant="primary" onClick={handleModalClose}>
              OK
            </Button>
          </Modal.Body>
        </Modal>
      </Container>
    </GoogleOAuthProvider>
  );
}

export default SignUp;