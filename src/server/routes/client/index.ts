import express, { Request, Response } from 'express'
import { config } from '../../util'

const router = express.Router()

const renderClient = (_req: Request, res: Response) => {
  res.type('html').send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Wally Ball</title>
      </head>
      <body>
        <div id='root'/>
        <script type="text/javascript" src="${config.BASE_PATH}/bundle.js"></script>
      </body>
    </html>
  `)
}

router.use(express.static('./dist'))
router.get('/', renderClient)

export default router
