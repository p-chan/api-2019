import { Assets } from '@prisma/photon'

export const pack = async (assets: Assets) => {
  return (await packMany([assets]))[0]
}

export const packMany = async (assets: Assets[]) => {
  return assets.map(value => {
    return {
      currency: value.currency,
      stock_spot: value.stockSpot,
      investment_trust: value.investmentTrust,
      pension: value.pension,
      point: value.point
    }
  })
}

const serializer = {
  pack,
  packMany
}

export { serializer }
