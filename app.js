import * as sql from './sql.js'

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pubPath = './public/'

const routes = [
  {
    paths: ['/', '/index.html']
  },
]

routes.forEach(route => {
  route.paths.forEach(pathStr => {
    app.get(pathStr, (req, res) => {
      try {
        res.sendFile(path.join(__dirname, `${pubPath}/${route.paths[0]}`))
      } catch (error) {
        console.error(error)
        res.status(500).send('Internal server error')
      }
    })
  })
})










app.use(express.static(path.join(__dirname, pubPath)))

const serverport = 21570
app.listen(serverport, () => console.log('Server running on http://127.0.0.1:' + serverport))
