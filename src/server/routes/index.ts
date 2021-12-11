import express from 'express'
import client from './client'
import { config } from '../util'

const { BASE_PATH } = config

const router = express.Router()

// ensure that the react-router handles all routing
router.use(BASE_PATH, client)
router.use(`${BASE_PATH}/*`, client)

export default router
