// import React from "react";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";

// function QuantumLearning() {
//   const courses = [
//     {
//       title: "Learn Shor's Algorithm",
//       description: "Explore how Shor's algorithm factors large numbers using quantum computing.",
//       learners: "50k+ learners",
//       rating: "4.8",
//       image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Shor_factorization.svg/320px-Shor_factorization.svg.png",
//     },
//     {
//       title: "Learn Grover's Algorithm",
//       description: "Understand Grover's search algorithm and its quadratic speedup for search problems.",
//       learners: "40k+ learners",
//       rating: "4.7",
//       image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Grover_search.svg/320px-Grover_search.svg.png",
//     },
//     {
//       title: "Learn Quantum Fourier Transform",
//       description: "Learn about the quantum Fourier transform and its role in quantum algorithms.",
//       learners: "30k+ learners",
//       rating: "4.6",
//       image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Quantum_Fourier_Transform_Circuit.svg/320px-Quantum_Fourier_Transform_Circuit.svg.png",
//     },
//   ];

//   return (
//     <Container className="my-5">
//       <h2 className="text-dark text-center mb-4">Learn Quantum Algorithms</h2>
//       <Row className="justify-content-center">
//         {courses.map((course, index) => (
//           <Col key={index} md={4} className="mb-4">
//             <Card className="shadow-sm border-0">
//               <Card.Img variant="top" src={course.image} className="p-3" />
//               <Card.Body>
//                 <Card.Title className="text-primary">{course.title}</Card.Title>
//                 <Card.Text>{course.description}</Card.Text>
//                 <p className="text-muted">{course.learners}</p>
//                 <p>⭐ {course.rating}</p>
//                 <Button variant="primary">View this Course</Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// }

// export default QuantumLearning;

import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function QuantumLearning() {
  const courses = [
    {
      title: "Learn Shor's Algorithm",
      description: "Explore how Shor's algorithm factors large numbers using quantum computing.",
      learners: "50k+ learners",
      rating: "4.8",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Shor_factorization.svg/320px-Shor_factorization.svg.png",
    },
    {
      title: "Learn Grover's Algorithm",
      description: "Understand Grover's search algorithm and its quadratic speedup for search problems.",
      learners: "40k+ learners",
      rating: "4.7",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Grover_search.svg/320px-Grover_search.svg.png",
    },
    {
      title: "Learn Quantum Fourier Transform",
      description: "Learn about the quantum Fourier transform and its role in quantum algorithms.",
      learners: "30k+ learners",
      rating: "4.6",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Quantum_Fourier_Transform_Circuit.svg/320px-Quantum_Fourier_Transform_Circuit.svg.png",
    },
  ];

  return (
    <Container className="my-5 d-flex justify-content-center">
      <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", width: "100%" }}>
        <h2 className="text-dark text-center mb-4">Learn Quantum Algorithms</h2>
        <Row className="justify-content-center">
          {courses.map((course, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="shadow-sm border-0">
                <Card.Img variant="top" src={course.image} className="p-3" />
                <Card.Body>
                  <Card.Title className="text-primary">{course.title}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                  <p className="text-muted">{course.learners}</p>
                  <p>⭐ {course.rating}</p>
                  <Button variant="primary">View this Course</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}

export default QuantumLearning;

