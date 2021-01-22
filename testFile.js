const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  /*await page.goto('https://www.youtube.com/feed/trending', {
    "waitUntil": "networkidle0"
  });

  const titles = await page.evaluate(
    () => Array.from(document.querySelectorAll('#video-title > yt-formatted-string'))
      .map((videoTitle) => videoTitle.innerText.trim())
  )
  console.log('Número de videos em alta no YT hoje -> ' + titles.length);
  */

  await page.goto('http://localhost', {
    "waitUntil": "networkidle0"
  });


  await page.waitForSelector('#informacao_conteudo > div.cartao-conteudo > ul > li:nth-child(1) > div > div.lista-titulo.pequeno');

  const curso = await page.evaluate(
    () => document.querySelector('#informacao_conteudo > div.cartao-conteudo > ul > li:nth-child(1) > div > div.lista-titulo.pequeno').innerText.trim()
  )
  console.log(curso)

  await browser.close();
})();
