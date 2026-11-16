# Gujarat in Numbers
 
An interactive dashboard of district-wise health and education indicators for Gujarat's 33 districts.
 
**Live demo:** https://krutagna-gor.github.io/gujarat-in-numbers/
 
## Features
- **Tile-grid map:** one square per district, arranged roughly like Gujarat's geography and coloured by the selected indicator
- **District details:** click a tile to see its values and rank among all districts
- **Compare:** pick any two districts and see the values side by side with the difference
- **Ranked bar chart** and a **data table** for all districts
- Works on desktop and phone
## Indicators
- Sex ratio
- Women (age 6+) who ever attended school (%)
- Population below age 15 (%)
## Data
- Source: National Family Health Survey (NFHS-5), 2019-21 (provisional), India Districts Factsheet, from [data.gov.in](https://www.data.gov.in/catalog/national-family-health-survey-5-nfhs-5-india-districts-factsheet-data-provisional)
- Filtered to Gujarat and trimmed to three indicators in Excel, then saved as `data/gujarat.csv`
- These are **survey estimates**, not a full census count, so small differences between districts may not be meaningful
- Data is used for learning and non-commercial purposes
## Why a tile-grid map?
I wanted a map that matches the 33 districts in the NFHS-5 data. The district boundary files I found either had no clear license or used older (2011) district boundaries. A tile-grid map avoids both problems. Tile positions are approximate and not to scale.
 
## Built with
HTML, CSS, JavaScript and [Chart.js](https://www.chartjs.org/) (MIT license). No backend.
 
## Run locally
1. Clone the repo
2. Open the folder in VS Code and start the **Live Server** extension (opening `index.html` directly will not work because the page loads the CSV with `fetch`)
## Project structure
```
gujarat-in-numbers/
  index.html
  style.css
  script.js
  README.md
  data/
    gujarat.csv
```
 
## Possible next steps
- Add more indicators
- Real district boundaries from a source with a clear license
- Gujarati / English language toggle
## Author
Krutagna Gor, B.Tech IT student
 