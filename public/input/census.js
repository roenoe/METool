let players = []
// Try to fetch the player table
fetchPlayer()
async function fetchPlayer() {
  try {
    let response = await fetch('/fetchPlayer')
    let data = await response.json()
    players = data
    displayCensusInput()

  } catch (error) {
    console.log("Error:", error)
  }
}


function displayCensusInput() {
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

  displayCensusInputElements()
}

function displayCensusInputElements() {
  const censusInputTable = document.getElementById("censusInputTable")

  players.forEach(player => {
    const row = document.createElement('tr')
    row.className = player.name
    row.innerHTML = `
      <td>
        ${player.pri} ${player.name}
      </td>
      <td>
        <input type="number" id="${player.name}-field" name="census">
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
        <button id="${player.playerid}-btn" onclick='toggleMilitary("${player.playerid}-btn", ${player.playerid})'>Military</button>
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

let toPush = []
async function calculateCensus() {
  toPush = []

  players.forEach(player => {
    const field = document.getElementById(`${player.name}-field`)
    const census = parseInt(field.value)

    toPush.push({
      playerid: player.playerid,
      census: census
    })
  })
  if (await check()) {
    await sendCensus()
  }
  console.log(toPush)
}

async function check() {
  for (var i = 0; i < toPush.length; i++) {
    // Check if number at all
    if (Number.isNaN(toPush[i].census)) {
      alert("Please fill in all the fields, and only use numbers")
      return false
    }

    // Make negative number positive
    if (toPush[i].census < 0 && toPush[i].census >= -55) {
      toPush[i].census += 55
    }

    // Check valid number
    if (toPush[i].census < 0 || toPush[i].census > 55) {
      alert("Please use a valid number. Valid numbers are between (-55) and 55 (inclusive)")
      return false
    }
  }
  return true
}

async function sendCensus() {
  for (var i = 0; i < toPush.length; i++) {
    console.log(toPush[i])
    try {
      await fetch('/sendCensus', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          playerid: toPush[i].playerid,
          census: toPush[i].census
        })
      })
    } catch (error) {
      console.error(error)
    }
  }
  location.reload()
}
