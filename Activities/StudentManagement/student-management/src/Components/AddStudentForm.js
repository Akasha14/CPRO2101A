import React, { useState } from "react";

const AddStudentForm = ({ onAddStudent }) => {
  // useState = hook that allows you to store and update data
  const [newStudent, setNewStudent] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddStudent(newStudent);
    setNewStudent("");
  };

  return (
    // onSubmit called when the form is submitted, and it sends the
    // new student’s name to the parent component.
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newStudent}
        onChange={(e) => setNewStudent(e.target.value)}
        placeholder="Enter student name"
      />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudentForm;
