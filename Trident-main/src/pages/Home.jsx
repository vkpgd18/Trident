// import React from "react";
// import { Container, Button, Form } from "react-bootstrap";
// import QuantumLearning from "../components/QuantumLearning";


// function Home() {
//   return (
//     <div className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: "#E9F0FC" }}>
//       <Container className="text-center">
//         <h1 className="fw-bold">Find Your Quantum Algorithm</h1>
//         <p className="lead">
//           Ask a question and let Trident help you discover relevant quantum algorithms.
//         </p>
//         <div className="d-flex justify-content-center">
//           <Form.Control type="text" placeholder="Ask your question..." className="w-50 me-2" />
//           <Button variant="primary">Find Algorithm ⚡</Button>
//         </div>
//         <div className="mt-4">
//           <p>or sign up with</p>
//           <Button variant="light" className="border">Google</Button>
//         </div>
//       </Container>
//     </div>
//     <QuantumLearning />
//     </div>
      
//   );
// }

// export default Home;

import React from "react";
import { Container, Button, Form } from "react-bootstrap";
import QuantumLearning from "../components/QuantumLearning";

function Home() {
  return (
    <div style={{ backgroundColor: "#E9F0FC", minHeight: "100vh" }}>
      {/* Hero Section */}
      <div className="d-flex align-items-center justify-content-center vh-100">
        <Container className="text-center">
          <h1 className="fw-bold">Find Your Quantum Algorithm</h1>
          <p className="lead">
            Ask a question and let Trident help you discover relevant quantum algorithms.
          </p>
          <div className="d-flex justify-content-center">
            <Form.Control type="text" placeholder="Ask your question..." className="w-50 me-2" />
            <Button variant="primary">Find Algorithm ⚡</Button>
          </div>
          <div className="mt-4">
            <p>or sign up with</p>
            <Button variant="light" className="border">Google</Button>
          </div>
        </Container>
      </div>

      {/* Quantum Learning Section */}
      <QuantumLearning />
    </div>
  );
}

export default Home;

