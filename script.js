async function loadData() {
  const response = await fetch("data/gujarat.csv");
  const text = await response.text();
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",");
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    const row = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j].trim()] = values[j].trim();
    }
    rows.push(row);
  }
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

loadData().then(drawTable);