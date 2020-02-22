import axios from 'axios'

export const yaminabeClient = () => {
  return axios.create({
    baseURL: 'https://asia-northeast1-yaminabe.cloudfunctions.net',
    headers: {
      Authorization: `Bearer ${process.env.YAMINABE_TOKEN}`
    }
  })
}

export type YaminabeMoneyforwardAssetId = 'depo' | 'eq' | 'mf' | 'pns' | 'po'

export type YaminabeMoneyforwardAsset = {
  id: YaminabeMoneyforwardAssetId
  title: string
  amount: number
}

export type YaminabeMoneyforwardAssets = {
  assets: YaminabeMoneyforwardAsset[]
}
