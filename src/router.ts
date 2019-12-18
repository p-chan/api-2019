import Router from 'express-promise-router'

import {
  accountsController,
  assetsController,
  identificationsController
} from './controllers/index'

const router = Router()

router.get('/accounts', accountsController.index)
router.get('/assets', assetsController.index)
router.patch('/assets', assetsController.update)
router.get('/identification', identificationsController.index)
router.get('/id', identificationsController.index)

export { router }
