const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.youtube.com/feed/trending', {
    "waitUntil": "networkidle0"
  });

  await page.waitForSelector('#video-title > yt-formatted-string', {
    timeout: 3000
  })

  const yt = await page.evaluate(() =>
    Array.from(document.querySelectorAll('#video-title > yt-formatted-string')).map((videoTitle) => videoTitle.innerText.trim())
  )

  console.table(yt)

  await browser.close();
})();



(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://br.investing.com/crypto/bitcoin/btc-brl', {
    "waitUntil": "networkidle0"
  });


  await page.waitForSelector('#last_last', {
    timeout: 3000
  })


  const bitcoin = await page.evaluate(() =>
    document.querySelector('#last_last').innerText.trim()
  )
  console.log('Cotação do bitcoin - ' + bitcoin)

  await browser.close();
})();


