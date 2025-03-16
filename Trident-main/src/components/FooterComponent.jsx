import React from "react";
import { Container } from "react-bootstrap";

function FooterComponent() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container className="text-center">
        <p className="mb-0">© 2025 Trident. All rights reserved.</p>
        <p className="mb-0">
          <a href="/privacy" className="text-light text-decoration-none">Privacy Policy</a> | 
          <a href="/terms" className="text-light text-decoration-none ms-2">Terms of Service</a>
        </p>
      </Container>
    </footer>
  );
}

export default FooterComponent;
