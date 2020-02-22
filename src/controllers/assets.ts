import express from 'express'
import Boom from '@hapi/boom'
import { Firestore } from '@google-cloud/firestore'

const index = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const firestore = new Firestore()

    const assetsCacheDocumentRef = firestore.doc(`caches/assets`)

    const assetsDocumentData = await assetsCacheDocumentRef
      .get()
      .then(document => document.data())

    if (assetsDocumentData == undefined) return next(Boom.internal())

    res.json(JSON.parse(assetsDocumentData.json).documents[0])
  } catch (error) {
    return next(Boom.internal(error.message))
  }
}

const controller = {
  index
}

export { controller }
