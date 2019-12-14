import chromium from 'chrome-aws-lambda'
import puppeteer from 'puppeteer'

export const launchBrowser = async () => {
  return await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless
  })
}

export const closeBrowser = async (browser: puppeteer.Browser) => {
  return await browser.close()
}
