import cors from 'cors'
import Router from 'express-promise-router'

import {
  accountsController,
  assetsController,
  identificationsController
} from './controllers/index'

const router = Router()

// CORS をサーバーレスに対応する
router.options('*', cors())

router.get('/accounts', accountsController.index)
router.get('/assets', assetsController.index)
router.patch('/assets', assetsController.update)
router.get('/identification', identificationsController.index)

export { router }
