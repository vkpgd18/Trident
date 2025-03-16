// import React from "react";
// import { Container, Table, Card } from "react-bootstrap";

// const pastAlgorithms = [
//   {
//     code: "QFT101",
//     name: "Quantum Fourier Transform",
//     date: "March 5, 2025",
//     complexity: "O(n log n)",
//   },
//   {
//     code: "GROVER102",
//     name: "Grover's Algorithm",
//     date: "Feb 28, 2025",
//     complexity: "O(√N)",
//   },
//   {
//     code: "SHOR103",
//     name: "Shor's Algorithm",
//     date: "Feb 20, 2025",
//     complexity: "O((log N)^3)",
//   },
// ];

// function Compete() {
//   return (
//     <div className="bg-dark text-light min-vh-100 py-5">
//       <Container>
//         <h2 className="text-center mb-4">Past Algorithms Searched</h2>
//         <Card className="shadow-sm bg-secondary p-3">
//           <Table striped bordered hover variant="dark" responsive>
//             <thead>
//               <tr>
//                 <th>Code</th>
//                 <th>Name</th>
//                 <th>Date Searched</th>
//                 <th>Complexity</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pastAlgorithms.map((algo, index) => (
//                 <tr key={index}>
//                   <td>{algo.code}</td>
//                   <td>{algo.name}</td>
//                   <td>{algo.date}</td>
//                   <td>{algo.complexity}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card>
//       </Container>
//     </div>
//   );
// }

// export default Compete;

import React from "react";
import { Container, Table } from "react-bootstrap";

function Compete() {
  const pastSearches = [
    { id: 1, query: "Quantum Fourier Transform", date: "March 4, 2025", result: "QFT Algorithm" },
    { id: 2, query: "Shor’s Algorithm for Factorization", date: "March 3, 2025", result: "Shor’s Algorithm" },
    { id: 3, query: "Grover’s Search Algorithm", date: "March 2, 2025", result: "Grover’s Algorithm" },
  ];

  return (
    <div style={{ backgroundColor: "#E9F0FC", minHeight: "100vh", paddingTop: "80px" }}>
      <Container className="text-center">
        <h2 className="fw-bold mb-4">Past Quantum Algorithm Searches</h2>
        <Table striped bordered hover className="shadow-sm bg-white">
          <thead style={{ backgroundColor: "#1A2B4C", color: "white" }}>
            <tr>
              <th>#</th>
              <th>Query</th>
              <th>Date</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {pastSearches.map((search) => (
              <tr key={search.id}>
                <td>{search.id}</td>
                <td>{search.query}</td>
                <td>{search.date}</td>
                <td>{search.result}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Compete;
