import express from 'express'
import { buildApp } from './app'

const app = express()

app.use(express.json())

buildApp(app).then(() => {
  app.listen(4000, () => {
    console.log(`API located at http://localhost:4000`)
  })
})
