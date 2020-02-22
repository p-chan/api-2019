import express from 'express'
import Boom from '@hapi/boom'
import { Firestore, Timestamp } from '@google-cloud/firestore'

import {
  createDayjs,
  yaminabeClient,
  YaminabeMoneyforwardAssets
} from '../utilities'

import {
  AssetDocumentModel,
  createAssetDocumentByYaminabeMoneyforwardAssets,
  upsertDocument
} from '../models'

import { assetsSerializer } from '../serializers'

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

    const assetDocumentRef = firestore.doc(
      `assets/${createDayjs().format('YYYYMMDD')}`
    )

    await upsertDocument(
      assetDocumentRef,
      createAssetDocumentByYaminabeMoneyforwardAssets(
        moneyforwardAssetsResponseData
      )
    ).catch(() => {
      throw new Error('Failed upsert assets data to Firestore')
    })

    const assetsCollectionRef = firestore.collection('assets')
    const latestAssetsQuerySnapshot = await assetsCollectionRef
      .orderBy('created_at', 'desc')
      .limit(30)
      .get()

    const latestAssetDocuments = latestAssetsQuerySnapshot.docs.map(
      document => <AssetDocumentModel<Timestamp>>document.data()
    )

    const packedLatestAssetDocuments = await assetsSerializer.packMany(
      latestAssetDocuments
    )

    const assetsCacheDocumentRef = firestore.doc(`caches/assets`)

    await assetsCacheDocumentRef
      .set({
        json: JSON.stringify({
          documents: packedLatestAssetDocuments
        })
      })
      .catch(error => {
        throw new Error(error.message)
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
