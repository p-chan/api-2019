import Router from 'express-promise-router'

import { identificationsController } from './controllers'

const router = Router()

router.get('/identifications', identificationsController.index)

export { router }
