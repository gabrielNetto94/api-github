const puppeteer = require('puppeteer');

module.exports = {

    async login(req, res) {
        const { cpf, password } = req.body;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 })

        var url = 'https://www.ufn.edu.br/agenda/';
        await page.goto(url)

        //DIGITAR CPF
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
        await page.waitForSelector('input[type=password]');
        await page.focus('input[type=password]');
        await page.keyboard.type(password);
        await page.screenshot({ path: 'teste1.png' });

        await page.waitForSelector('#senha');
        await page.focus('#senha');
        await page.keyboard.type(password);
        //await page.screenshot({ path: 'teste2.png' });

        //CLICAR BOTÃO LOGIN
        console.log("Realizando login...");
        await page.waitForSelector('button[type=submit]');
        await page.click('button[type=submit]');
        //await page.screenshot({ path: 'teste3.png' });

        //SELECIONAR GRADUAÇÃO OU TEC ADM
        await page.waitForSelector('input[type=radio]');
        const matriculas = await page.$$eval('input[type=radio]', matriculas => {
            return matriculas.map(matricula => matricula.value.trim())
        })
        //SELECIONA O ÚLTIMO ITEM DO RADIO BUTTON
        const matriculaAluno = matriculas[matriculas.length - 1];

        await page.waitForSelector('input[type=radio][value="' + matriculaAluno + '"]')
        await page.click('input[type=radio][value="' + matriculaAluno + '"]');
        await page.click('button[type=submit]');
        //await page.screenshot({ path: 'teste4.png' });

        //await page.screenshot({ path: 'teste5.png' });
        console.log('Login Realizado');

        //PEGA O NOME DO ESTUDANDTE NO AGENDA
        await page.waitForSelector('#menu_superior_usuario > div > div > span.usuario-titulo');
        const nomeEstudante = await page.$eval('#menu_superior_usuario > div > div > span.usuario-titulo', elm => elm.textContent)
        console.log('Buscando notas de ' + nomeEstudante.trim());

        //ESPERA A TABELA DE NOTAS E A PRIMEIRA DISCIPLINA SER GERADA
        await page.waitForSelector('#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo');
        await page.waitForSelector('#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo > div:nth-child(1) > div:nth-child(4)');
        await page.waitForSelector('#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo > div:nth-child(1) > div:nth-child(5)');
        await page.waitForSelector('#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo > div:nth-child(1) > div:nth-child(6)');

        //COLOCA OS VALORES PARA OS VETORES  ps: da pra melhorar esse código mas não sei trabalhar direito com .map ou com o page.$$eval  
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

        //MOSTRA VALORES
        for (var i = 0; i < disciplinas.length; i++) {
            console.log(disciplinas[i] + ' -- Nota1: ' + nota1[i] + ' Nota2: ' + nota2[i] + ' Nota3: ' + nota3[i])
        }

        await browser.close();

        res.json({
                nomeEstudante: nomeEstudante.trim(),
                disciplinas

        })
    }
}