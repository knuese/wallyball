import http from 'http'
import app from './app'
import { config } from './util'

const { BASE_PATH } = config

const httpPort = 8080
const httpServer = http.createServer(app).listen(httpPort, () => {
  console.log(`front-end is located at localhost:${httpPort}${BASE_PATH}`)
  console.log(`app is listening at localhost:${httpPort}`)
})

process.on('SIGTERM', () => {
  httpServer.close(() => {
    console.log('SIGTERM issued, app is shutting down...')
    process.exit(0)
  })
})
