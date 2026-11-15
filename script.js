let chart;

const INDICATOR_LABEL = {
  "sex_ratio": "Sex ratio",
  "female_school_pct": "Women who ever attended school (%)",
  "pop_below15_pct": "Population below age 15 (%)"
};

// [row, column] for each district. Positions are approximate, feel free to change.
// Names must exactly match the "district" column in the CSV.
const TILE_POS = {
  "Kachchh": [0, 1], "Banas Kantha": [0, 3], "Sabar Kantha": [0, 5],
  "Morbi": [1, 1], "Surendranagar": [1, 2], "Patan": [1, 3], "Mahesana": [1, 4], "Aravali": [1, 5],
  "Devbhumi Dwarka": [2, 0], "Jamnagar": [2, 1], "Rajkot": [2, 2], "Botad": [2, 3], "Gandhinagar": [2, 4],
  "Porbandar": [3, 0], "Junagadh": [3, 1], "Amreli": [3, 2], "Ahmadabad": [3, 3], "Kheda": [3, 4], "Mahisagar": [3, 5], "Dohad": [3, 6],
  "Gir Somnath": [4, 1], "Bhavnagar": [4, 2], "Anand": [4, 4], "Panchmahal": [4, 5], "Chhota Udaipur": [4, 6],
  "Vadodara": [5, 4], "Narmada": [5, 5],
  "Bharuch": [6, 4], "Tapi": [6, 5],
  "Surat": [7, 4], "The Dangs": [7, 5],
  "Navsari": [8, 4], "Valsad": [8, 5]
};

async function loadData() {
  const response = await fetch("data/gujarat.csv");
  const text = await response.text();
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map(h => h.trim());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    if (values[0].trim() === "") continue;
    const row = {};
    for (let j = 0; j < 4; j++) {
      row[headers[j]] = values[j].trim();
    }
    rows.push(row);
  }
  console.log("rows:", rows.length);
  return rows;
}

function drawTable(rows) {
  const table = document.getElementById("dataTable");
  let html = "<tr><th>District</th><th>" + INDICATOR_LABEL.female_school_pct +
             "</th><th>" + INDICATOR_LABEL.pop_below15_pct +
             "</th><th>" + INDICATOR_LABEL.sex_ratio + "</th></tr>";
  for (const r of rows) {
    html += "<tr><td>" + r.district + "</td><td>" + r.female_school_pct +
            "</td><td>" + r.pop_below15_pct + "</td><td>" + r.sex_ratio + "</td></tr>";
  }
  table.innerHTML = html;
}

function drawMap(rows, key) {
  const map = document.getElementById("tileMap");
  const values = rows.map(r => Number(r[key]));
  const min = Math.min(...values);
  const max = Math.max(...values);
  map.innerHTML = "";

  for (const r of rows) {
    const pos = TILE_POS[r.district];
    if (!pos) {
      console.log("Not in grid:", r.district);
      continue;
    }
    const v = Number(r[key]);
    const t = (v - min) / (max - min);

    const tile = document.createElement("div");
    tile.className = "tile";
    tile.style.gridRow = pos[0] + 1;
    tile.style.gridColumn = pos[1] + 1;
    tile.style.background = "hsl(210, 80%, " + (90 - t * 55) + "%)";
    tile.style.color = t > 0.5 ? "#fff" : "#000";
    tile.title = r.district + ": " + v;
    tile.innerHTML = "<b>" + r.district + "</b><br>" + v;
    map.appendChild(tile);
  }

  document.getElementById("mapLegend").textContent =
    "Low: " + min + "  →  High: " + max;
}

function drawChart(rows, key) {
  const sorted = [...rows].sort((a, b) => Number(b[key]) - Number(a[key]));
  const labels = sorted.map(r => r.district);
  const values = sorted.map(r => Number(r[key]));

  if (chart) chart.destroy();
  chart = new Chart(document.getElementById("myChart"), {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{ label: INDICATOR_LABEL[key], data: values, backgroundColor: "#4da3ff" }]
    },
    options: { indexAxis: "y", responsive: false, animation: false }
  });
}

loadData().then(rows => {
  drawTable(rows);
  drawMap(rows, "sex_ratio");
  drawChart(rows, "sex_ratio");
  document.getElementById("indicator").addEventListener("change", e => {
    drawMap(rows, e.target.value);
    drawChart(rows, e.target.value);
  });
});
