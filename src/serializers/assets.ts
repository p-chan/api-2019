import { Assets } from '@prisma/photon'
import { createDayjs } from '../utilities'

export const pack = async (assets: Assets) => {
  return (await packMany([assets]))[0]
}

export const packMany = async (assets: Assets[]) => {
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
          amount: value.stockSpot,
          currency: 'JPY'
        },
        {
          type: 'investment_trust',
          amount: value.investmentTrust,
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
      updated_at: createDayjs(value.createdAt.toString()).format()
    }
  })
}

const serializer = {
  pack,
  packMany
}

export { serializer }
