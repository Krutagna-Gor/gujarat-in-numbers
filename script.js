let chart;

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
  let html = "<tr><th>Jillo</th><th>Female school (%)</th><th>Pop below 15 (%)</th><th>Sex ratio</th></tr>";
  for (const r of rows) {
    html += "<tr><td>" + r.district + "</td><td>" + r.female_school_pct +
            "</td><td>" + r.pop_below15_pct + "</td><td>" + r.sex_ratio + "</td></tr>";
  }
  table.innerHTML = html;
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
      datasets: [{ label: key, data: values, backgroundColor: "#4da3ff" }]
    },
    options: { indexAxis: "y", responsive: false, animation: false }
  });
}

loadData().then(rows => {
  drawTable(rows);
  drawChart(rows, "sex_ratio");
  document.getElementById("indicator").addEventListener("change", e => {
    drawChart(rows, e.target.value);
  });
});