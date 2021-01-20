const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 })

    var url = 'https://www.ufn.edu.br/agenda/';
    var cpf = '';
    var password = '';
    var matricula = '';

    await page.goto(url)

    //DIGITAR CPF
    console.log("Digitando CPF");
    await page.waitForSelector('#chave');
    await page.focus('#chave');
    await page.waitForSelector('#chave');
    await page.keyboard.press('ArrowLeft');
    await page.waitForSelector('#chave');
    await page.focus('#chave');
    await page.keyboard.press('ArrowLeft');
    await page.focus('#chave');
    await page.keyboard.press('ArrowLeft');

    //CLICAR NO BOTAO DE PRÓXIMO
    await page.keyboard.type(cpf);
    await page.focus('button')
    await page.click('button')

    //DIGITAR SENHA
    console.log("Digitando Senha");
    await page.waitForSelector('input[type=password]');
    await page.focus('input[type=password]');
    await page.keyboard.type(password);
    await page.screenshot({ path: 'teste1.png' });
    await page.waitForSelector('#senha');
    await page.focus('#senha');
    await page.keyboard.type(password);
    await page.screenshot({ path: 'teste2.png' });

    //CLICAR BOTÃO LOGIN
    console.log("Realizando login");
    await page.waitForSelector('button[type=submit]');
    await page.click('button[type=submit]');
    await page.screenshot({ path: 'teste3.png' });

    //SELECIONAR GRADUAÇÃO OU TEC ADM
    await page.waitForSelector('input[type=radio][value="' + matricula + '"]')
    await page.click('input[type=radio][value="' + matricula + '"]');
    await page.click('button[type=submit]');
    await page.screenshot({ path: 'teste4.png' });

    await page.screenshot({ path: 'teste5.png' });
    console.log("Usuário " + cpf + " Logado!");


    await page.waitForSelector('#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo > div:nth-child(1) > div.col.col-12.cor-matriculado');
    await page.waitForSelector('#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo > div:nth-child(1) > div:nth-child(4)');
    await page.waitForSelector('#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo > div:nth-child(1) > div:nth-child(5)');
    await page.waitForSelector('#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo > div:nth-child(1) > div:nth-child(6)');

    const disciplina = await page.$eval("#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo > div:nth-child(1) > div.col.col-12.cor-matriculado", el => el.textContent);
    const nota1 = await page.$eval("#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo > div:nth-child(1) > div:nth-child(4)", el => el.textContent);
    const nota2 = await page.$eval("#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo > div:nth-child(1) > div:nth-child(5)", el => el.textContent);
    const nota3 = await page.$eval("#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo > div:nth-child(1) > div:nth-child(6)", el => el.textContent);
    console.log('Disciplina: ' + disciplina.trim() + ' - Nota 1: ' + nota1.trim() + ' Nota 2: ' + nota2.trim() + ' Nota 3:' + nota3.trim())


    /*
    await page.waitForSelector('#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo > div:nth-child(1) > div.col.col-12.cor-matriculado');
    await page.waitForSelector('#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo > div:nth-child(1) > div:nth-child(4)');
    await page.waitForSelector('#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo > div:nth-child(1) > div:nth-child(5)');
    await page.waitForSelector('#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo > div:nth-child(1) > div:nth-child(6)');
    const disciplina = await page.$eval("#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo > div:nth-child(1) > div.col.col-12.cor-matriculado", el => el.textContent);
    const nota1 = await page.$eval("#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo > div:nth-child(1) > div:nth-child(4)", el => el.textContent);
    const nota2 = await page.$eval("#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo > div:nth-child(1) > div:nth-child(5)", el => el.textContent);
    const nota3 = await page.$eval("#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo > div:nth-child(1) > div:nth-child(6)", el => el.textContent);
    console.log('Disciplina: ' + disciplina.trim() + ' - Nota 1: ' + nota1.trim() + ' Nota 2: ' + nota2.trim() + ' Nota 3:' + nota3.trim())
*/
    await browser.close();

})();