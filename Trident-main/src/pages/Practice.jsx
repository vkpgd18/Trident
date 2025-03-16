// import React, { useState } from "react";
// import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";

// function QuantumLearning() {
//   const courses = [
//     {
//       title: "Learn Shor's Algorithm",
//       description:
//         "Explore how Shor's algorithm factors large numbers using quantum computing.",
//       detailedDescription:
//         "Shor's algorithm is a quantum algorithm for integer factorization, running exponentially faster than the best-known classical algorithms. It leverages quantum Fourier transforms to efficiently break RSA encryption, making it crucial in quantum cryptography and cybersecurity.",
//       learners: "50k+ learners",
//       rating: "4.8",
//       image:
//         "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Shor_factorization.svg/320px-Shor_factorization.svg.png",
//     },
//     {
//       title: "Learn Grover's Algorithm",
//       description:
//         "Understand Grover's search algorithm and its quadratic speedup for search problems.",
//       detailedDescription:
//         "Grover's algorithm provides a quantum solution to searching unsorted databases with quadratic speedup over classical algorithms. It finds a marked item in O(√N) time, making it impactful for optimization problems and quantum machine learning.",
//       learners: "40k+ learners",
//       rating: "4.7",
//       image:
//         "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Grover_search.svg/320px-Grover_search.svg.png",
//     },
//     {
//       title: "Learn Quantum Fourier Transform",
//       description:
//         "Learn about the quantum Fourier transform and its role in quantum algorithms.",
//       detailedDescription:
//         "The quantum Fourier transform (QFT) is the quantum counterpart of the discrete Fourier transform. It plays a fundamental role in many quantum algorithms, such as Shor's algorithm, by transforming quantum states efficiently, reducing computational complexity.",
//       learners: "30k+ learners",
//       rating: "4.6",
//       image:
//         "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Quantum_Fourier_Transform_Circuit.svg/320px-Quantum_Fourier_Transform_Circuit.svg.png",
//     },
//   ];

//   const [showModal, setShowModal] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);

//   const handleShowModal = (course) => {
//     setSelectedCourse(course);
//     setShowModal(true);
//   };

//   return (
//     <Container className="my-5 d-flex justify-content-center">
//       <div
//         style={{
//           backgroundColor: "white",
//           padding: "2rem",
//           borderRadius: "12px",
//           boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
//           width: "100%",
//         }}
//       >
//         <h2 className="text-dark text-center mb-4">Learn Quantum Algorithms</h2>
//         <Row className="justify-content-center">
//           {courses.map((course, index) => (
//             <Col key={index} md={4} className="mb-4">
//               <Card className="shadow-sm border-0">
//                 <Card.Img variant="top" src={course.image} className="p-3" />
//                 <Card.Body>
//                   <Card.Title className="text-primary">{course.title}</Card.Title>
//                   <Card.Text>{course.description}</Card.Text>
//                   <p className="text-muted">{course.learners}</p>
//                   <p>⭐ {course.rating}</p>
//                   <Button variant="primary" onClick={() => handleShowModal(course)}>
//                     View this Course
//                   </Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </div>

//       {/* Course Details Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
//         <Modal.Header closeButton>
//           <Modal.Title>{selectedCourse?.title}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <img
//             src={selectedCourse?.image}
//             alt={selectedCourse?.title}
//             style={{ width: "100%", borderRadius: "8px" }}
//             className="mb-3"
//           />
//           <p>{selectedCourse?.detailedDescription}</p>
//           <p className="text-muted">{selectedCourse?.learners}</p>
//           <p>⭐ {selectedCourse?.rating}</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// }

// export default QuantumLearning;


import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";

function QuantumLearning() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      title: "Learn Shor's Algorithm",
      description: "Explore how Shor's algorithm factors large numbers using quantum computing.",
      details: "Shor's algorithm efficiently factors large numbers, solving problems that classical computers struggle with. This is crucial for breaking RSA encryption.",
      learners: "50k+ learners",
      rating: "4.8",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Shor_factorization.svg/320px-Shor_factorization.svg.png",
    },
    {
      title: "Learn Grover's Algorithm",
      description: "Understand Grover's search algorithm and its quadratic speedup for search problems.",
      details: "Grover's algorithm provides a quadratic speedup for unstructured search problems, reducing the time complexity from O(N) to O(√N).",
      learners: "40k+ learners",
      rating: "4.7",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Grover_search.svg/320px-Grover_search.svg.png",
    },
    {
      title: "Learn QFT",
      description: "Learn about the QFT and its role in quantum algorithms.",
      details: "The Quantum Fourier Transform (QFT) is a key component in many quantum algorithms, including Shor's algorithm. It allows efficient transformations in quantum computing.",
      learners: "30k+ learners",
      rating: "4.6",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Quantum_Fourier_Transform_Circuit.svg/320px-Quantum_Fourier_Transform_Circuit.svg.png",
    },
    {
      title: "Learn Quantum Entanglement",
      description: "Discover how quantum entanglement enables instant correlations between distant particles.",
      details: "Quantum entanglement is a phenomenon where two or more particles share a quantum state, enabling faster-than-light communication in quantum cryptography and computing.",
      learners: "35k+ learners",
      rating: "4.9",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Bell_state.svg/320px-Bell_state.svg.png",
    },
  ];

  const handleShowModal = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", width: "100%" }}>
        <h2 className="text-dark text-center mb-4">Learn Quantum Algorithms</h2>
        <Row className="justify-content-center">
          {courses.map((course, index) => (
            <Col key={index} md={4} className="mb-4 d-flex">
              <Card className="shadow-sm border-0 flex-fill">
                <Card.Img variant="top" src={course.image} className="p-3" style={{ height: "180px", objectFit: "contain" }} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-primary">{course.title}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                  <p className="text-muted">{course.learners}</p>
                  <p>⭐ {course.rating}</p>
                  <Button variant="primary" onClick={() => handleShowModal(course)}>View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Modal for Course Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedCourse?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Overview:</strong> {selectedCourse?.description}</p>
          <p><strong>Details:</strong> {selectedCourse?.details}</p>
          <p><strong>⭐ Rating:</strong> {selectedCourse?.rating} | <strong>📚 Learners:</strong> {selectedCourse?.learners}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default QuantumLearning;

