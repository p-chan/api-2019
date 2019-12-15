import express from 'express'
import puppeteer from 'puppeteer'
import Boom from '@hapi/boom'
import UserAgent from 'user-agents'
import { launchBrowser, closeBrowser } from '../utilities/index'

const index = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.json({
    assets: {}
  })
}

const update = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!process.env.MONEYFORWARD_EMAIL || !process.env.MONEYFORWARD_PASSWORD)
    return next(Boom.internal())

  const depositSelector = '#portfolio_det_depo h1.heading-small'
  const equitySelector = '#portfolio_det_eq h1.heading-small'
  const mutualFundSelector = '#portfolio_det_mf h1.heading-small'
  const pensionSelector = '#portfolio_det_pns h1.heading-small'
  const pointSelector = '#portfolio_det_po h1.heading-small'

  const getAmountFromPage = async (page: puppeteer.Page, selector: string) => {
    return await page.$eval(selector, element => {
      if (!element.textContent) return

      return Number(element.textContent.replace(/[合計：|,|円|\n]/g, ''))
    })
  }

  const userAgent = new UserAgent({
    deviceCategory: 'desktop',
    platform: 'MacIntel'
  })

  try {
    const browser = await launchBrowser()

    const page = await browser.newPage()

    // タブをエミュレートする
    await page.emulate({
      userAgent: userAgent.toString(),
      viewport: {
        width: 1024,
        height: 768
      }
    })

    // ログインページへ遷移する
    await page.goto('https://moneyforward.com/users/sign_in', {
      waitUntil: 'domcontentloaded'
    })

    // ログイン情報を入力する
    await page.type('input[type="email"]', process.env.MONEYFORWARD_EMAIL)
    await page.type('input[type="password"]', process.env.MONEYFORWARD_PASSWORD)

    // ログインを実行する
    await Promise.all([
      page.click('input[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle0' })
    ])

    // 資産内訳ページへ遷移する
    await page.goto('https://moneyforward.com/bs/portfolio', {
      waitUntil: 'domcontentloaded'
    })

    // 金額を取得する
    const deposit = await getAmountFromPage(page, depositSelector)
    const equity = await getAmountFromPage(page, equitySelector)
    const mutualFund = await getAmountFromPage(page, mutualFundSelector)
    const pension = await getAmountFromPage(page, pensionSelector)
    const point = await getAmountFromPage(page, pointSelector)

    await page.close()

    await closeBrowser(browser)

    res.json({
      assets: {
        deposit: deposit,
        equity: equity,
        mutual_fund: mutualFund,
        pension: pension,
        point: point
      }
    })
  } catch (error) {
    console.error(error)

    return next(Boom.internal())
  }
}

const controller = {
  index,
  update
}

export { controller }
