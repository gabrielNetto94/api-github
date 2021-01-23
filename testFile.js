const puppeteer = require('puppeteer');

const disciplinas = [
  "EDU250 - Antropologia e Cosmovisão Franciscana",
  "CPT329 - Fundamentos de Computação Gráfica",
  "CPT330 - Legislação em Informática",
  "CPT332 - Qualidade de Software",
  "CPT373 - Sistemas Cooperativos",
  "CNT102 - Trabalho Final de Graduação I"
];
const nota_1_bi = [
  "1,0",
  "2,0",
  "3,0",
  "4,0",
  "5,0",
  "6,0"
];
const nota_2_bi = [
  "1,0",
  "2,0",
  "3,0",
  "4,0",
  "5,0",
  "6,0"
];
const nota_3_bi = [
  "1,0",
  "2,0",
  "3,0",
  "4,0",
  "5,0",
  "6,0"
];


const a = {
  disciplina1: {
    nota1: '8,7',
    nota2: '9,4',
    nota3: '8,4',
  },
  disciplina2: {
    nota1: '8,7',
    nota2: '9,4',
    nota3: '8,4'
  },
}

const tabelaNotas = {};
for (i in disciplinas) {
  tabelaNotas[i] = {
    disciplina: disciplinas[i],
    nota1: nota_1_bi[i],
    nota2: nota_2_bi[i],
    nota3: nota_2_bi[i]

  }
}
console.table(tabelaNotas)

/*
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

*/
