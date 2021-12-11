import bodyParser from 'body-parser'
import express from 'express'
import routes from './routes'
import { local } from './middleware'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(local)
app.use(routes)

app.get('/api/hello', (_req, res) => {
  res.send({ express: 'Hello from Express' })
})

export default app
