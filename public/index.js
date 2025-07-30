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
  const orderedPlayer = calculateCensus(player)
  const censusDisplay = document.getElementById("censusDisplay")

  censusDisplay.innerHTML = `
    <table id="censusTable" class="center">
      <tr>
        <th colspan="3">Civilization</th>
        <th>Census</th>
        <th>Military</th>
        <th>AST Requirement</th>
        <th>AST VPs</th>
        <th>ADV VPs</th>
        <th>Total VPs</th>
      </tr>
    </table>
  `

  displayCensusElements(orderedPlayer)
}

function calculateCensus(player) {
  // Sort by military (ascending)
  const orderedPlayer = player.sort((a, b) => {
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
  return orderedPlayer
}

function displayCensusElements(players) {
  const censusTable = document.getElementById("censusTable")

  players.forEach(player => {
    if (player.military == 0) {
      player.military = "No"
    } else {
      player.military = "Yes"
    }
    const row = document.createElement('tr')
    row.className = player.name
    row.innerHTML = `
      <td>
        ${player.pri}
      </td>
      <td>
        ${player.name}
      </td>
      <td>
        ${player.playername}
      </td>
      <td>
        ${player.census}
      </td>
      <td>
        ${player.military}
      </td>
      <td>
        ${player.astreq}
      </td>
      <td>
        ${player.astpoint}
      </td>
      <td>
        ${player.adv}
      </td>
      <td>
        ${player.adv + player.astpoint}
      </td>
    `

    censusTable.appendChild(row)
  })
}
