import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import StudentList from "./Components/StudentList";
import AddStudentForm from "./Components/AddStudentForm";

function App() {
  // Function for StudentList.
  const [students, setStudents] = useState(["Alice", "Bob", "Charlie"]);
  // Function for AddStudentForm.
  const handleAddStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };
  // Router: This allows us to navigate between different pages.
  // Link: These are clickable links that navigate to different routes.
  // Route: Defines which component should appear when a specific URL is visited.
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add-student">Add Student</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<StudentList students={students} />} />
          <Route
            path="/add-student"
            element={<AddStudentForm onAddStudent={handleAddStudent} />}
          />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
