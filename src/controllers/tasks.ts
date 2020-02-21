import express from 'express'
import Boom from '@hapi/boom'
import { Firestore } from '@google-cloud/firestore'

import {
  createDayjs,
  yaminabeClient,
  YaminabeMoneyforwardAssets
} from '../utilities'

import {
  createAssetDocumentByYaminabeMoneyforwardAssets,
  upsertDocument
} from '../models'

const updateAssets = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const moneyforwardAssetsResponseData = await yaminabeClient()
      .get('/moneyforward_assets', {
        params: {
          email: process.env.MONEYFORWARD_EMAIL,
          password: process.env.MONEYFORWARD_PASSWORD
        }
      })
      .then(response => {
        return response.data as YaminabeMoneyforwardAssets
      })
      .catch(() => {
        throw new Error('Failed get Moneyforward assets')
      })

    const firestore = new Firestore()

    const documentRef = firestore.doc(
      `assets/${createDayjs().format('YYYYMMDD')}`
    )

    await upsertDocument(
      documentRef,
      createAssetDocumentByYaminabeMoneyforwardAssets(
        moneyforwardAssetsResponseData
      )
    ).catch(() => {
      throw new Error('Failed upsert assets data to Firestore')
    })

    res.json({
      message: 'ok'
    })
  } catch (error) {
    return next(Boom.internal(error.message))
  }
}

const controller = {
  updateAssets
}

export { controller }
