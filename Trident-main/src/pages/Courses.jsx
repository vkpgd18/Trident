// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
// import Editor from "@monaco-editor/react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

// function PythonIDE() {
//   const [code, setCode] = useState("# Write your Python code here...\n");
//   const [userInput, setUserInput] = useState("");
//   const [output, setOutput] = useState("");
//   const [theme, setTheme] = useState("vs-dark"); // Default Dark Mode

//   const runCode = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/run", {
//         code,
//         userInput,
//       });
//       setOutput(response.data.output);
//     } catch (error) {
//       setOutput("Error executing code");
//     }
//   };

//   // Toggle between Dark and Light mode
//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === "vs-dark" ? "light" : "vs-dark"));
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center">Python IDE</h2>

//       {/* Monaco Editor with Dynamic Theme */}
//       <Editor
//         height="300px"
//         theme={theme}
//         defaultLanguage="python"
//         value={code}
//         onChange={(value) => setCode(value || "")}
//         className="border"
//       />

//       {/* User Input Section */}
//       <textarea
//         className="form-control mt-2"
//         rows="3"
//         value={userInput}
//         onChange={(e) => setUserInput(e.target.value)}
//         placeholder="Enter inputs separated by commas (e.g., 5,10)..."
//       />

//       {/* Run Button & Theme Toggle Icon */}
//       <div className="d-flex align-items-center mt-3">
//         <button className="btn btn-primary me-2" onClick={runCode}>
//           Run
//         </button>
//         <button className="btn btn-outline-secondary" onClick={toggleTheme}>
//           <FontAwesomeIcon icon={theme === "vs-dark" ? faSun : faMoon} />
//         </button>
//       </div>

//       {/* Output Section */}
//       <pre className="mt-3 p-3 bg-light border">{output}</pre>
//     </div>
//   );
// }

// export default PythonIDE;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faUpload, faDownload } from "@fortawesome/free-solid-svg-icons";

function PythonIDE() {
  const [code, setCode] = useState("# Write your Python code here...\n");
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState("");
  const [theme, setTheme] = useState("vs-dark"); // Default Dark Mode

  const runCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/run", {
        code,
        userInput,
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput("Error executing code");
    }
  };

  // Toggle between Dark and Light mode
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "vs-dark" ? "light" : "vs-dark"));
  };

  // Handle File Upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result); // Load file content into the editor
      };
      reader.readAsText(file);
    }
  };

  // Handle Save Code as .py File
  const handleSaveCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "code.py";
    link.click();
  };

  return (
    <div className="container mt-4">
       <h2 className="text-center">Python IDE</h2>

      {/* File Upload & Save Buttons */}
      <div className="d-flex justify-content-between mb-2">
        <label className="btn btn-outline-secondary">
          <FontAwesomeIcon icon={faUpload} /> Upload
          <input type="file" accept=".py" hidden onChange={handleFileUpload} />
        </label>
        <button className="btn btn-outline-secondary" onClick={handleSaveCode}>
          <FontAwesomeIcon icon={faDownload} /> Save
        </button>
      </div>

      {/* Monaco Editor with Dynamic Theme */}
      <Editor
        height="300px"
        theme={theme}
        defaultLanguage="python"
        value={code}
        onChange={(value) => setCode(value || "")}
        className="border"
      />

      {/* User Input Section */}
      <textarea
        className="form-control mt-2"
        rows="3"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter inputs separated by commas (e.g., 5,10)..."
      />

      {/* Run Button & Theme Toggle Icon */}
      <div className="d-flex align-items-center mt-3">
        <button className="btn btn-primary me-2" onClick={runCode}>
          Run
        </button>
        <button className="btn btn-outline-secondary" onClick={toggleTheme}>
          <FontAwesomeIcon icon={theme === "vs-dark" ? faSun : faMoon} />
        </button>
      </div>

      {/* Output Section */}
      <pre className="mt-3 p-3 bg-light border">{output}</pre>
    </div>
  );
}

export default PythonIDE;
