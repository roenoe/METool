let pendingCivs = []
let civs = []

// Try to fetch the player table
fetchPlayer()
async function fetchPlayer() {
  try {
    let response = await fetch('/fetchPlayer')
    let data = await response.json()
    console.log(data)

    // If it cannot fetch player table, instead fetch civ table for choosing whichs civs should go into player table
    if (!data) {
      fetchCiv()
    }

  } catch (error) {
    console.log("Error:", error)
  }
}

async function fetchCiv() {
  try {
    let response = await fetch('/fetchCiv')
    let data = await response.json()
    civs = data

    displayCivSelect()
  } catch (error) {
    console.log("Error", error)
  }
}

function displayCivSelect() {
  const civSelect = document.getElementById('civSelect')
  civSelect.innerHTML = `
    <h2>Select Civilizations for your game</h2>

    <table id="civSelectTable">
      <tr>
        <th>Civilization</th>
        <th>Button <button onclick="toggleAll()">Toggle all</button></th>
      </tr>
    </table>

    <button onclick="activatePlayers()">Submit these civs as your civs for this game</button>
    ` // Empty the table

  // Display elements
  civs.forEach(civ => {
    const row = document.createElement('tr')
    row.className = civ.name
    row.innerHTML = `
      <td>${civ.pri} ${civ.name}</td>
      <td>
        <button id="${civ.name}-btn" onclick="toggleCiv('${civ.name}-btn', ${civ.id})">Toggle civ</button>
      </td>
    `

    const civSelectTable = document.getElementById("civSelectTable")
    civSelectTable.appendChild(row)
  })
}

function toggleAll() {
  civs.forEach(civ => {
    const btn = civ.name + "-btn"
    toggleCiv(btn, civ.id)
  })
}

function toggleCiv(btnid, civid) {
  let btn = document.getElementById(btnid)
  btn.classList.toggle("green")
  let exists = false
  let location = ""
  for (var i = 0; i < pendingCivs.length; i++) {
    if (pendingCivs[i] == civid) {
      exists = true
      location = i
    }
  }
  if (exists) {
    pendingCivs.splice(location, 1)
  } else {
    pendingCivs.push(civid)
  }
}

async function activatePlayers() {
  for (var i = 0; i < pendingCivs.length; i++) {
    await activatePlayer(pendingCivs[i])
  }
  location.reload()
}


async function activatePlayer(civid) {
  try {
    await fetch('/activatePlayer', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ civid: civid })
    })
  } catch (error) {
    console.log("Error", error)
  }
}
