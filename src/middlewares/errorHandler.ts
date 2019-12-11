import Boom from '@hapi/boom'
import express from 'express'

export const errorHandler = (
  err: Boom.Boom,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response => {
  return res.status(err.output.statusCode).json(err.output.payload)
}

export const notFoundHandler = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const error = Boom.notFound()

  return next(error)
}
