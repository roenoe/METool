import sqlite3 from 'better-sqlite3'
const db = sqlite3('./db/database.db')

// Fetch player table
export function fetchPlayer() {
  const sqltext = 'select player.id as playerid, civid, military, census, ast, name, pri ' +
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
export function activatePlayer(civid) {
  const sqltext = 'insert into player (civid, military, census, ast) values (?, ?, ?, ?);'
  const sql = db.prepare(sqltext)
  const response = sql.run(civid, 0, 0, 0)
  if (response.length == 0) {
    return false
  }
  return response
}
