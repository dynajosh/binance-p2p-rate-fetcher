import puppeteer from 'puppeteer';

async function getP2PRate() {

  // With this, I am launching a headless Chromium browser
  const browser = await puppeteer.launch({ headless: "new" });

  // Like regular browsing, after launching a browser the next thing you'd ideally do is to open a page/tab
  const page = await browser.newPage();

  // After opening a new page, you would want to enter the URL you intend to visit and so we do that by passing the URL here.
  // I already selected my Fiat currency and you can see that in the query params
  await page.goto('https://p2p.binance.com/en/trade/sell/USDT?fiat=NGN&payment=BANK');


  // Next up, I am looking for the className with which Binance wrapped their rate values so I can extract the rate from the first div with that class
  // In this case I used the inspect element tool on chrome to get this and it turned out to be "css-onyc9z"
  const rateWrapper = await page.waitForSelector('div > .css-onyc9z');

  // Now that I have pointed out the div that holds the rate by filtering it using it's css className I would proceed to get the rate which is the textContent of that div
  const rawRate =  await rateWrapper.evaluate(el => el.textContent);

  // I have now gotten the rate value and I'll be rounding it up to a whole number before returning it.
  const roundedRate = Math.round(rawRate)

  
  // Closing the browser because I am done with the operations.

  await browser.close();

  return roundedRate


}

getP2PRate()
