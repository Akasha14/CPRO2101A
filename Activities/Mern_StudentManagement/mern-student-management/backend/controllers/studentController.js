// Import Student Model.
const Student = require("../models/studentModel");

// Controller function to create a new Student.
const createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body); // Create a new student with request data.

    await newStudent.save(); // Save the student to the database.

    res.status(201).json(newStudent); // Send the new student as response.
  } catch (err) {
    res.status(400).json({ message: "Error creating student", error }); // Send error message if any.
  }
};

// Controller function to get all Students.

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all students from the database.

    res.status(200).json(students); // Send the students as response.
  } catch (err) {
    res.status(500).json({ message: "Error retrieving students", error });
  }
};

// Controller function to get a Student by ID.
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id); // Fetch a student by ID from the database.

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student); // Send the student as response.
  } catch (err) {
    res.status(500).json({ message: "Error retrieving student", error }); // Send error message if any.
  }
};

// Controller function to update a Student by ID.

const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); // Update a student by ID with new request data.

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student); // Send the updated student as response.
  } catch (err) {
    res.status(400).json({ message: "Error updating student", error }); // Send error message if any.
  }
};

// Controller function to delete a Student by ID.
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id); // Delete a student by ID from the database.

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(204).json(); // Send a 204 No Content response.
  } catch (err) {
    res.status(500).json({ message: "Error deleting student", error }); // Send error message if any.
  }
};

// Export all the controller functions.
module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
