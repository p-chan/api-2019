import express from 'express'

import { accounts } from '../data/index'

const index = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.json(accounts)
}

const controller = {
  index
}

export { controller }
