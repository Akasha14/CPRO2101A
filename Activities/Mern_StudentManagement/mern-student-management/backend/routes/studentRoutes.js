const express = require("express");

const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

// Create new router instance.
const router = express.Router();

// Create a new student.
router.post("/students", createStudent);

// Get all students.
router.get("/students", getAllStudents);

// Get a student by id.
router.get("/students/:id", getStudentById);

// Update a student by id.
router.put("/students/:id", updateStudent);

// Delete a student by id.
router.delete("/students/:id", deleteStudent);

module.exports = router;
