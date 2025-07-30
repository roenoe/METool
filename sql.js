import sqlite3 from 'better-sqlite3'
const db = sqlite3('./db/database.db')

// Fetch player table
export function fetchPlayer() {
  let sqltext = 'select player.id as playerid, player.name as playername, military, census, astpoint, civ.name as name, pri, adv, '
  if (checkExpert()) {
    sqltext += 'expert as astreq'
  } else {
    sqltext += 'basic as astreq'
  }
  sqltext += ' from player inner join civ on civid = civ.id inner join ast on astpoint = ast.point;'
  const sql = db.prepare(sqltext)
  const response = sql.all()
  if (response.length == 0) {
    return false
  }
  return response
}

function checkExpert() {
  const sqltext = 'select expert from game;'
  const sql = db.prepare(sqltext)
  const response = sql.all()
  if (response.length == 0) {
    return false
  }
  return response[0].expert
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
  const sqltext = 'insert into player (civid, military, census, astpoint, adv, name) values (?, ?, ?, ?, ?, ?);'
  const sql = db.prepare(sqltext)
  const response = sql.run(civid, 0, 0, 0, 0, name)
  if (response.length == 0) {
    return false
  }
  return response
}

// Activate game
export function activateGame(expert) {
  //const sqltext = 'insert into game (expert) values (?);'
  const sqltext = 'update game set expert = ? where id = 1;'
  const sql = db.prepare(sqltext)
  const response = sql.run(expert)
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

export function sendADV(playerid, ADV) {
  const sqltext = 'update player set adv = ? where id = ?'
  const sql = db.prepare(sqltext)
  const response = sql.run(ADV, playerid)
  return response
}

export function alterAST(playerid, fwd) {
  const prevAST = checkAST(playerid)
  const sqltext = 'update player set astpoint = ? where id = ?;'
  const sql = db.prepare(sqltext)
  let newAST = prevAST
  if (fwd) {
    newAST += 5
  } else {
    newAST -= 5
  }
  const response = sql.run(newAST, playerid)
  return response
}

function checkAST(playerid) {
  const sqltext = 'select astpoint from player where id = ?'
  const sql = db.prepare(sqltext)
  const response = sql.get(playerid)
  return response.astpoint
}
