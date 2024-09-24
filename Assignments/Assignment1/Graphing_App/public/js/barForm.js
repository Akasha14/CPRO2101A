// Almost exact same code as pieForm.js, other than the chart generation

document.getElementById("homeButton").addEventListener("click", function () {
  window.location.href = "/";
});

const numBarsSelect = document.getElementById("numOfBars");
const barsContainer = document.getElementById("barsContainer");
const gridlineIntervalInput = document.getElementById("gridlineInterval");

// When change in number selection dropdown
numBarsSelect.addEventListener("change", function () {
  // Get user input
  const numBars = parseInt(this.value);

  barsContainer.innerHTML = "";

  // Create bar inputs based on number selected
  for (let i = 1; i <= numBars; i++) {
    // Create div with class bar
    const barDiv = document.createElement("div");
    barDiv.classList.add("bar");

    barDiv.innerHTML = `
        <h3>Bar ${i}:</h3>
        <label for="bar${i}Label">Label:</label>
        <input type="text" id="bar${i}Label" name="bar${i}Label" required />
        <label for="bar${i}Value">Value:</label>
        <input type="number" id="bar${i}Value" name="bar${i}Value" required min="0" max="400" />
      `;

    barsContainer.appendChild(barDiv);
  }
});

// Initialize(execute event listener) with 2 bars when first loading
numBarsSelect.dispatchEvent(new Event("change"));

// Bar Graph code (on submit)
document
  .getElementById("chartForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    // Show the bar chart container(originally hidden)
    const barChartContainer = document.querySelector(".chartContainer");
    barChartContainer.style.display = "flex";

    // Gather user data from the form
    const chartTitle = document.getElementById("chartTitle").value;
    const numBars = parseInt(document.getElementById("numOfBars").value);
    const gridlineInterval = parseInt(
      document.getElementById("gridlineInterval").value
    );
    const yAxisLabel = document.getElementById("yAxisLabel").value;

    const data = [["Label", yAxisLabel]]; // Set the first row with label for Y-axis

    // Populate 2D array with user input
    for (let i = 1; i <= numBars; i++) {
      const label = document.getElementById(`bar${i}Label`).value;
      const value = parseFloat(document.getElementById(`bar${i}Value`).value);
      data.push([label, value]);
    }

    // Call the drawChart function with the new data
    drawBarChart(data, chartTitle, gridlineInterval, yAxisLabel);
  });

// Google Charts for drawing the bar chart
function drawBarChart(dataArray, chartTitle, gridlineInterval, yAxisLabel) {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(() => {
    // Convert dataArray into a Google Charts DataTable
    const data = google.visualization.arrayToDataTable(dataArray);

    // Find the maximum value in the data to set the gridlines dynamically
    const maxValue = Math.max(...dataArray.slice(1).map((row) => row[1]));

    // Calculate the number of gridlines based on max value and gridline interval
    const maxGridline =
      Math.ceil(maxValue / gridlineInterval) * gridlineInterval;

    const options = {
      title: chartTitle,
      legend: "none",
      vAxis: {
        title: yAxisLabel,
        minValue: 0,
        // Ensure the chart scales up to the next interval
        viewWindow: {
          min: 0,
          max: maxGridline,
        },
        // Set gridlines based on interval
        gridlines: {
          count: maxGridline / gridlineInterval + 1,
        },
      },
      series: {
        0: { targetAxisIndex: 1 }, // Attach the first series to the right-side axis
      },
    };

    const chart = new google.visualization.ColumnChart(
      document.getElementById("userBarChart")
    );
    chart.draw(data, options);
  });
}
