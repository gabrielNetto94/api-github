const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost', { "waitUntil": "networkidle0" });

  //.tabela-conteudo .tabela-linha .col.col-2.a-center:nth-child(4)
  //.tabela-conteudo .tabela-linha

  /*const notas = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.tabela-conteudo .tabela-linha .col.col-2.a-center:nth-child(4)')).map(el => 'N1: ' + el.textContent.trim())
  );*/



  const disciplinas = await page.$$eval('.tabela-conteudo .tabela-linha .col.col-12.cor-matriculado:nth-child(1)', disciplinas => {
    return disciplinas.map(disciplina => disciplina.textContent.trim())
  })
  const nota1 = await page.$$eval('.tabela-conteudo .tabela-linha .col.col-2.a-center:nth-child(4)', notas => {
    return notas.map(nota => nota.textContent.trim())
  })
  const nota2 = await page.$$eval('.tabela-conteudo .tabela-linha .col.col-2.a-center:nth-child(5)', notas => {
    return notas.map(nota => nota.textContent.trim())
  })

  const nota3 = await page.$$eval('.tabela-conteudo .tabela-linha .col.col-2.a-center:nth-child(6)', notas => {
    return notas.map(nota => nota.textContent.trim())
  })

  for (var i=0;i < disciplinas.length;i++){
    console.log(disciplinas[i]+' -- Nota1: '+nota1[i]+' Nota2: '+nota2[i]+' Nota3: '+nota3[i] )
  }


  //console.log(nota1 + '\n' + nota2 + '\n' + nota3)

  //console.log(notas)

  await browser.close();
})();



/*let scrape = async () => {

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://books.toscrape.com/')

  //await page.evaluate(() => alert('This message is inside an alert box'))
  //await page.screenshot({ path: 'books.png' });

  const result = await page.evaluate(() => {
    const books = []
    document.querySelectorAll('section > div > ol > li img').forEach((book) => books.push(book.getAttribute('alt')))
    return books
  })

  browser.close()
  return result
}

scrape().then((value) => {
  console.log(value)
})*/