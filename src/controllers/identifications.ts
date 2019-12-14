import express from 'express'

import { identifications } from '@data/index'

const index = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.json(identifications)
}

const controller = {
  index
}

export { controller }
