// Try to fetch the player table
fetchPlayer()
async function fetchPlayer() {
  try {
    let response = await fetch('/fetchPlayer')
    let data = await response.json()
    displayCensusInput(data)

  } catch (error) {
    console.log("Error:", error)
  }
}


function displayCensusInput(data) {
  const censusInput = document.getElementById("censusInput")

  censusInput.innerHTML = `
    <h2>What is your census?</h2>

    <table id="censusInputTable">
      <tr>
        <th>Civilization</th>
        <th>Census</th>
        <th>Military</th>
      </tr>
    </table>

    <button onclick="calculateCensus()">Calculate</button>
  `

  displayCensusInputElements(data)
}

function displayCensusInputElements(data) {
  const censusInputTable = document.getElementById("censusInputTable")

  data.forEach(player => {
    const row = document.createElement('tr')
    row.className = player.name
    row.innerHTML = `
      <td>
        ${player.pri} ${player.name}
      </td>
      <td>
        <input type="number" id="${player.name}-field" name="population">
      </td>
    `
    if (player.military) {
      row.innerHTML += `
        <td>
          <button id="${player.id}-btn" class="green" onclick='toggleMilitary("${player.playerid}-btn", ${player.playerid})'>Military</button>
        </td>
      `
    } else {
      row.innerHTML += `
      <td>
        <button id="${player.id}-btn" onclick='toggleMilitary("${player.playerid}-btn", ${player.playerid})'>Military</button>
      </td>
    `
    }

    censusInputTable.appendChild(row)
  })
}

async function toggleMilitary(btnid, playerid) {
  let btn = document.getElementById(btnid)
  btn.classList.toggle("green")

  try {
    await fetch('/toggleMilitary', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ playerid: playerid })
    })
  } catch (error) {
    console.log("Error", error)
  }
}
