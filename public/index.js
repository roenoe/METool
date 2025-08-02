fetchCensus()
setInterval(function() {
  fetchCensus()
}, 3000)

async function fetchCensus() {
  try {
    let response = await fetch('/fetchPlayer')
    let data = await response.json()
    displayCensus(data)

  } catch (error) {
    console.log("Error", error)
  }
}

function displayCensus(player) {
  const censusDisplay = document.getElementById("censusDisplay")

  censusDisplay.innerHTML = `
    <div class="split-table-container">
      <table id="leftTable" class="center split-table">
        <tr>
          <th colspan="3">Civilization</th>
          <th>Census</th>
          <th>Military</th>
        </tr>
      </table>

      <table id="rightTable" class="center split-table">
        <tr>
          <th colspan="3">Civilization</th>
          <th>AST Requirement</th>
          <th>AST VPs</th>
          <th>ADV VPs</th>
          <th>Total VPs</th>
        </tr>
      </table>
    </div>
  `

  displayCensusElements(player)
}

function orderByCensus(player) {
  return [...player].sort((a, b) => {
    // Sort by military (ascending)
    if (a.military !== b.military) {
      return a.military - b.military;
    }
    // Then by census (descending)
    if (a.census !== b.census) {
      return b.census - a.census;
    }
    // Then by priority (ascending)
    return a.pri - b.pri;
  })
}

function orderByVPs(player) {
  // Sort by Total VPs (descending)
  return [...player].sort((a, b) => {
    // Define total VPs
    const aTotalVPs = a.adv + a.astpoint
    const bTotalVPs = b.adv + b.astpoint

    // Sort by total VPs (descending)
    if (aTotalVPs !== bTotalVPs) {
      return bTotalVPs - aTotalVPs
    }
    // Then by priority (ascending)
    return a.pri - b.pri;
  })
}

function displayCensusElements(players) {
  const leftTable = document.getElementById("leftTable")
  const rightTable = document.getElementById("rightTable")

  // Prepare a sorted copy for the left table
  const sortedByCensus = orderByCensus(players)
  // Prepare a sorted copy for the right table
  const sortedByVPs = orderByVPs(players)

  sortedByCensus.forEach(player => {
    const rowClass = player.name
    const military = player.military == 0 ? "No" : "Yes"

    const leftRow = document.createElement('tr')
    leftRow.className = rowClass
    leftRow.innerHTML = `
      <td>${player.pri}</td>
      <td>${player.name}</td>
      <td>${player.playername}</td>
      <td>${player.census}</td>
      <td>${military}</td>
    `
    leftTable.appendChild(leftRow)
  })

  sortedByVPs.forEach(player => {
    const rowClass = player.name
    const totalVPs = player.adv + player.astpoint

    const rightRow = document.createElement('tr')
    rightRow.className = rowClass
    rightRow.innerHTML = `
      <td>${player.pri}</td>
      <td>${player.name}</td>
      <td>${player.playername}</td>
      <td>${player.astreq}</td>
      <td>${player.astpoint}</td>
      <td>${player.adv}</td>
      <td>${totalVPs}</td>
    `
    rightTable.appendChild(rightRow)
  })
}
