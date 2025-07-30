let players = []

// Try to fetch the player table
fetchPlayer()
async function fetchPlayer() {
  try {
    let response = await fetch('/fetchPlayer')
    let data = await response.json()
    players = data
    if (players) {
      displayCensusInput(false)
    }

  } catch (error) {
    console.log("Error:", error)
  }
}


function editCensus() {
  displayCensusInput(true)
}

function displayCensusInput(edit) {
  const censusInput = document.getElementById("censusInput")

  censusInput.innerHTML = `
    <table id="censusInputTable" class="center">
      <tr>
        <th colspan="3">Civilization</th>
        <th>Census</th>
        <th colspan="2">AST</th>
        <th>Advances</th>
        <th>Military</th>
      </tr>
    </table>

    <button onclick="calculateCensus()">Calculate Census</button>
    <button onclick="calculateAdvances()">Calculate Advances</button>
    <button onclick="editCensus()">Edit last census</button>
  `

  if (edit) {
    displayCensusInputElements(true)
  } else {
    displayCensusInputElements(false)
  }
}

function displayCensusInputElements(edit) {
  const censusInputTable = document.getElementById("censusInputTable")

  players.forEach(player => {
    const row = document.createElement('tr')
    row.className = player.name
    row.id = player.pri + "row"
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
        <input type="number" id="${player.name}-field" name="census">
      </td>
        ${player.astreq}
      <td>
        <button id="{player.playerid}-bwd" onclick='alterAST(${player.playerid}, false)'><-</button>
        <button id="{player.playerid}-fwd" onclick='alterAST(${player.playerid}, true)'>-></button>
      </td>
      <td>
        <input type="number" id="${player.name}-ADVField" name="advances" placeholder="Previous: ${player.adv}">
      </td>
    `
    if (player.military) {
      row.innerHTML += `
        <td>
          <button id="${player.playerid}-btn" class="green" onclick='toggleMilitary("${player.playerid}-btn", ${player.playerid})'>Military</button>
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
    if (edit) {
      const field = document.getElementById(`${player.name}-field`)
      field.value = player.census
    }
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

async function calculateAdvances() {
  let ADVToPush = []
  for (var i = 0; i < players.length; i++) {
    let player = players[i]
    const field = document.getElementById(`${player.name}-ADVField`)
    const ADV = parseInt(field.value)

    // Alert and abort if undefined
    if (isNaN(ADV)) {
      alert("Make sure all players' advance VP totals are input")
      return false
    }

    ADVToPush.push({
      playerid: player.playerid,
      ADV: ADV
    })
  }
  await sendAdvances(ADVToPush)
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

async function checkADV() { }

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

async function sendAdvances(data) {
  for (var i = 0; i < data.length; i++) {
    console.log(data[i])
    try {
      await fetch('/sendADV', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          playerid: data[i].playerid,
          ADV: data[i].ADV
        })
      })
    } catch (error) {
      console.error(error)
    }
  }
  location.reload()
}

async function alterAST(playerid, fwd) {
  try {
    await fetch('/alterAST', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        playerid: playerid,
        fwd: fwd
      })
    })
  } catch (error) {
    console.error(error)
  }
  fetchPlayer()
}
