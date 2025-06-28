import * as sql from './sql.js'

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pubPath = './public/'

app.use(express.json()) // <-- This is essential for req.body to be populated



// Fetch player table
app.get('/fetchPlayer', (req, res) => {
  const player = sql.fetchPlayer()
  res.send(player)
})

// Fetch civ table
app.get('/fetchCiv', (req, res) => {
  const civ = sql.fetchCiv()
  res.send(civ)
})

// Player activation
app.post('/activatePlayer', (req, res) => {
  const { civid } = req.body
  const civ = sql.activatePlayer(civid)

  if (!civ) {
    return res.json({ error: 'Failed to activate player' })
  } else {
    return res.json({ message: 'Activated player', civid: civid })
  }
})









app.use(express.static(path.join(__dirname, pubPath)))

const serverport = 21570
app.listen(serverport, () => console.log('Server running on http://127.0.0.1:' + serverport))
