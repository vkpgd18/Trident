// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

// function App() {
//   return (
//     <div className="container-fluid p-0">
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-light bg-white px-5">
//         <a className="navbar-brand fw-bold fs-3" href="#">Trident</a>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item"><a className="nav-link" href="#">Courses</a></li>
//             <li className="nav-item"><a className="nav-link" href="#">Practice</a></li>
//             <li className="nav-item"><a className="nav-link" href="#">Compete</a></li>
//             <li className="nav-item"><a className="nav-link" href="#">Login</a></li>
//             <li className="nav-item"><button className="btn btn-primary">Sign Up</button></li>
//           </ul>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="hero d-flex align-items-center justify-content-center text-center text-dark vh-100">
//         <div className="container">
//           <h1 className="fw-bold display-4">Find Your Quantum Algorithm</h1>
//           <p className="lead">Ask a question and let Trident help you discover relevant quantum algorithms.</p>
//           <div className="row justify-content-center mt-4">
//             <div className="col-md-6">
//               <div className="input-group">
//                 <input type="text" className="form-control" placeholder="Ask your question..." />
//                 <button className="btn btn-primary">Find Algorithm ⚡</button>
//               </div>
//             </div>
//           </div>
//           <p className="mt-3">or sign up with</p>
//           <button className="btn btn-outline-dark">
//             <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" className="me-2" /> Google
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Practice from "./pages/Practice";
import Compete from "./pages/Compete";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Discussions from "./pages/Discussions";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/compete" element={<Compete />} />
        <Route path="/discussions" element={<Discussions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <FooterComponent />
    </Router>
  );
}

export default App;
