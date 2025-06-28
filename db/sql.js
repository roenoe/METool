import sqlite3 from 'better-sqlite3'
const db = sqlite3('./db/database.db')

// Fetch player table
export function fetchPlayer() {
  const sqltext = 'select id, name, pri from civ;'
  const sql = db.prepare(sqltext)
  const response = sql.all()
  return response
}

// Fetch civ table
export function fetchCiv() {
  const sqltext = 'select id, name, pri from civ;'
  const sql = db.prepare(sqltext)
  const response = sql.all()
  return response
}
