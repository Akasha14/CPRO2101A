const express = require("express");

const app = express();

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/imgs", express.static(__dirname + "public/imgs"));

// Main Page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Pie Chart Form Page
app.get("/PieChartForm", (req, res) => {
  res.sendFile(__dirname + "/views/pieChartForm.html");
});

// Pie Chart Page
app.get("/PieChart", (req, res) => {
  res.sendFile(__dirname + "/views/pieChart.html");
});

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
