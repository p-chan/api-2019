import { FieldValue } from '@google-cloud/firestore'

import {
  YaminabeMoneyforwardAssets,
  YaminabeMoneyforwardAsset
} from '../utilities'

export type AssetDocumentModel<T = FieldValue> = {
  currency: number
  stock_spot: number
  investment_trust: number
  pension: number
  point: number
  created_at: T
  updated_at: T
}

export const createAssetDocumentByYaminabeMoneyforwardAssets = (
  json: YaminabeMoneyforwardAssets
): AssetDocumentModel => {
  const yaminabeAssetsByID: {
    [key: string]: YaminabeMoneyforwardAsset
  } = json.assets.reduce(
    (obj, asset: YaminabeMoneyforwardAsset) => ({
      ...obj,
      [asset.id]: asset
    }),
    {}
  )

  return {
    currency: yaminabeAssetsByID.depo.amount,
    stock_spot: yaminabeAssetsByID.eq.amount,
    investment_trust: yaminabeAssetsByID.mf.amount,
    pension: yaminabeAssetsByID.pns.amount,
    point: yaminabeAssetsByID.po.amount,
    created_at: FieldValue.serverTimestamp(),
    updated_at: FieldValue.serverTimestamp()
  }
}
