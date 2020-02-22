import cors from 'cors'
import Router from 'express-promise-router'

import {
  accountsController,
  assetsController,
  identificationsController,
  tasksController
} from './controllers/index'

const router = Router()

// CORS をサーバーレスに対応する
router.options('*', cors())

router.get('/accounts', accountsController.index)
router.get('/assets', assetsController.index)
router.get('/identification', identificationsController.index)
router.get('/tasks/update_assets', tasksController.updateAssets)

export { router }
