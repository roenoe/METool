import sqlite3 from 'better-sqlite3'
const db = sqlite3('./db/database.db')

// Fetch player table
export function fetchPlayer() {
  const sqltext = 'select player.id as playerid, player.name as playername, civid, military, census, ast, civ.name as name, pri ' +
    ' from player inner join civ on civid = civ.id; '
  const sql = db.prepare(sqltext)
  const response = sql.all()
  if (response.length == 0) {
    return false
  }
  return response
}

// Fetch civ table
export function fetchCiv() {
  const sqltext = 'select id, name, pri from civ;'
  const sql = db.prepare(sqltext)
  const response = sql.all()
  if (response.length == 0) {
    return false
  }
  return response
}

// Activate player
export function activatePlayer(civid, name) {
  const sqltext = 'insert into player (civid, military, census, ast, name) values (?, ?, ?, ?, ?);'
  const sql = db.prepare(sqltext)
  const response = sql.run(civid, 0, 0, 0, name)
  if (response.length == 0) {
    return false
  }
  return response
}

// Toggle military
export function toggleMilitary(playerid) {
  const sqltext = 'update player set military = ? where id = ?'
  const sql = db.prepare(sqltext)
  let response = ""
  if (checkMilitary(playerid)) {
    response = sql.run(0, playerid)
  } else {
    response = sql.run(1, playerid)
  }
  return response
}

function checkMilitary(playerid) {
  const sqltext = 'select military from player where id = ?'
  const sql = db.prepare(sqltext)
  const response = sql.all(playerid)
  return response[0].military
}

export function sendCensus(playerid, census) {
  const sqltext = 'update player set census = ? where id = ?'
  const sql = db.prepare(sqltext)
  const response = sql.run(census, playerid)
  return response
}
