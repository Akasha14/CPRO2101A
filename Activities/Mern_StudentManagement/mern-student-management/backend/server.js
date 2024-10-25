const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const studentRoutes = require("./routes/studentRoutes");

// Load environment variables from .env file.
dotenv.config();

const app = express();

// Middleware: CORS allows requests from different origins, bodyParser parses incoming JSON data.
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (URL stored in .env).
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection failed:", err));

// Use routes for student management.
app.use("/api/students", studentRoutes);

// Start the server on port 5000.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
