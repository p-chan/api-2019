import Router from 'express-promise-router'

import { assetsController, identificationsController } from './controllers'

const router = Router()

router.get('/assets', assetsController.index)
router.patch('/assets', assetsController.update)
router.get('/identifications', identificationsController.index)

export { router }
