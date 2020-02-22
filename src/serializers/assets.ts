import { createDayjs } from '../utilities'
import { AssetDocumentModel } from '../models'
import { Timestamp } from '@google-cloud/firestore'

export const pack = async (assets: AssetDocumentModel<Timestamp>) => {
  return (await packMany([assets]))[0]
}

export const packMany = async (assets: AssetDocumentModel<Timestamp>[]) => {
  return assets.map(value => {
    return {
      assets: [
        {
          type: 'currency',
          amount: value.currency,
          currency: 'JPY'
        },
        {
          type: 'stock_spot',
          amount: value.stock_spot,
          currency: 'JPY'
        },
        {
          type: 'investment_trust',
          amount: value.investment_trust,
          currency: 'JPY'
        },
        {
          type: 'pension',
          amount: value.pension,
          currency: 'JPY'
        },
        {
          type: 'point',
          amount: value.point,
          currency: 'JPY'
        }
      ],
      updated_at: createDayjs(value.updated_at.toDate().toString()).format()
    }
  })
}

const serializer = {
  pack,
  packMany
}

export { serializer }
