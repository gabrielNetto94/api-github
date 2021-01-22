const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost', {
    "waitUntil": "networkidle0"
  });

  try {

    await page.waitForSelector('#informacao_conteudo > div.cartao-conteudo > ul > li:nth-child(1) > div > div.lista-titulo.pequeno', {
      timeout: 3000
    })

    const curso = await page.evaluate(
      () => document.querySelector('#informacao_conteudo > div.cartao-conteudo > ul > li:nth-child(1) > div > div.lista-titulo.pequeno').innerText.trim()
    )
    console.log(curso)

  } catch (error) {
    console.log("The element didn't appear.")
  }

  /*await page.waitForSelector('#informacao_conteudo > div.cartao-conteudo > ul > li:nth-child(1) > div > div.lista-titulo.pequeno');
  const curso = await page.evaluate(
    () => document.querySelector('#informacao_conteudo > div.cartao-conteudo > ul > li:nth-child(1) > div > div.lista-titulo.pequeno').innerText.trim()
  )
  console.log(curso)*/

  await browser.close();
})();
