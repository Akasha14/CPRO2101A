document.getElementById("homeButton").addEventListener("click", function () {
  window.location.href = "/";
});

const numSectorsSelect = document.getElementById("numSectors");
const sectorsContainer = document.getElementById("sectorsContainer");
const totalValueInput = document.getElementById("totalValue");

// When change in number selection dropdown
numSectorsSelect.addEventListener("change", function () {
  // Get user input
  const numSectors = parseInt(this.value);

  sectorsContainer.innerHTML = "";

  // Create sectors based on number selected
  for (let i = 1; i <= numSectors; i++) {
    // Create div with class sector
    const sectorDiv = document.createElement("div");
    sectorDiv.classList.add("sector");

    sectorDiv.innerHTML = `
      <h3>Sector ${i}:</h3>
      <label for="sector${i}Label">Label:</label>
      <input type="text" id="sector${i}Label" name="sector${i}Label" required />
      <label for="sector${i}Value">Value:</label>
      <input type="number" id="sector${i}Value" name="sector${i}Value" required 
      ${i === numSectors ? "readonly" : ""} />`; // Read only mode when last sector

    sectorsContainer.appendChild(sectorDiv);
  }

  // Make a list of input elements from sectorsContainer whose IDs start with sector and end with Value
  const sectorValueInputs = sectorsContainer.querySelectorAll(
    `input[id^="sector"][id$="Value"]`
  );

  // All but the final sectorValue
  for (let i = 0; i < numSectors - 1; i++) {
    // Input given = updateFinalSector
    sectorValueInputs[i].addEventListener("input", updateFinalSector);
  }
  updateFinalSector();
});

function updateFinalSector() {
  const numSectors = parseInt(numSectorsSelect.value);
  const totalValue = parseFloat(totalValueInput.value);
  let sum = 0;

  // Sum up the sectorValues
  for (let i = 1; i < numSectors; i++) {
    const sectorValue =
      parseFloat(document.getElementById(`sector${i}Value`).value) || 0;
    sum += sectorValue;
  }

  // Calculate and show the final sector value
  const finalValue = totalValue - sum;
  const finalSectorInput = document.getElementById(`sector${numSectors}Value`);
  finalSectorInput.value = finalValue;
}

// Pie Graph code (on submit)
document
  .getElementById("pieChartForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    // Show the pie chart container
    const pieChartContainer = document.querySelector(".pieChartContainer");
    pieChartContainer.style.display = "flex";

    // Gather data from the form
    const chartTitle = document.getElementById("chartTitle").value;
    const numSectors = parseInt(document.getElementById("numSectors").value);
    const totalValue = parseFloat(document.getElementById("totalValue").value);

    const data = [["Sector", "Value"]];

    // Populate 2 dimensional array with user input
    for (let i = 1; i <= numSectors; i++) {
      const label = document.getElementById(`sector${i}Label`).value;
      const value = parseFloat(
        document.getElementById(`sector${i}Value`).value
      );
      data.push([label, value]);
    }

    // Call the drawChart function with the new data
    drawChart(data, chartTitle);
  });

// Google charts created inside function.
function drawChart(dataArray, chartTitle) {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(() => {
    // Use outside data
    const data = google.visualization.arrayToDataTable(dataArray);
    const options = { title: chartTitle };

    const chart = new google.visualization.PieChart(
      document.getElementById("userPieChart")
    );
    chart.draw(data, options);
  });
}

// Initialize(execute event listener) with 2 sectors when first loading
numSectorsSelect.dispatchEvent(new Event("change"));
