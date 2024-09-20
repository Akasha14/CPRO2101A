import React from "react";

const StudentList = ({ students }) => {
  // function that takes in a students prop.
  return (
    <div>
      <h2>Student List</h2>
      {students.length === 0 ? (
        <p>No students avalible</p>
      ) : (
        <ul>
          {/* .map() is a JavaScript function that loops through the 
        list of students and displays them in a list. */}
          {students.map((student, index) => (
            <li key={index}>{student}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default StudentList;
