const puppeteer = require('puppeteer');

var page;
var browser;

function setPage(page) {
    this.page = page;
}

function getPage() {

    return this.page;
}

function setBrowser(browser) {
    this.browser = browser;
}

function getBrowser() {
    return this.browser;
}

async function closeBrowser() {
    const browser = getBrowser();
    await browser.close();
}

async function startBroser() {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 })
    setPage(page);
    setBrowser(browser);
}
startBroser();

module.exports = {

    async login(req, res) {

        var page = getPage();

        const { cpf, password } = req.body;

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

        var matriculaAluno;

        try {
            //SELECIONAR GRADUAÇÃO OU TEC ADM
            await page.waitForSelector('input[type=radio]', {
                timeout: 2000
            });
            const matriculas = await page.$$eval('input[type=radio]', matriculas => {
                return matriculas.map(matricula => matricula.value.trim())
            })
            //SELECIONA O ÚLTIMO ITEM DO RADIO BUTTON
            matriculaAluno = matriculas[matriculas.length - 1];

            await page.waitForSelector('input[type=radio][value="' + matriculaAluno + '"]')
            await page.click('input[type=radio][value="' + matriculaAluno + '"]');
            await page.click('button[type=submit]');
            //await page.screenshot({ path: 'teste4.png' });

            //console.log('Precisa selecionar vinculo institucional')
        } catch (e) {
            //console.log('Usuário não precisa selecionar vinculo institucional')
        }

        //await page.screenshot({ path: 'teste5.png' });
        console.log('Login Realizado');

        //PEGA O NOME DO ESTUDANDTE NO AGENDA
        await page.waitForSelector('#menu_superior_usuario > div > div > span.usuario-titulo');

        //OUTRA MANEIRA DE PEGAR APENAS 1 ELEMENTO
        const studentName = await page.evaluate(
            () => document.querySelector('#menu_superior_usuario > div > div > span.usuario-titulo').textContent.trim()
        )
        //const studentName = await page.$eval('#menu_superior_usuario > div > div > span.usuario-titulo', elm => elm.textContent.trim())
        console.log('Buscando notas de ' + studentName);

        //ESPERA A TABELA DE NOTAS E A PRIMEIRA DISCIPLINA SER GERADA
        await page.waitForSelector('#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo');
        await page.waitForSelector('#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo > div:nth-child(1) > div:nth-child(4)');
        await page.waitForSelector('#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo > div:nth-child(1) > div:nth-child(5)');
        await page.waitForSelector('#caderno_conteudo > div.cartao-conteudo > div > div.tabela-conteudo > div:nth-child(1) > div:nth-child(6)');

        //COLOCA OS VALORES PARA OS VETORES  ps: da pra melhorar esse código mas não sei trabalhar direito com .map ou com o page.$$eval  
        const disciplinas = await page.$$eval('.tabela-conteudo .tabela-linha .col.col-12.cor-matriculado:nth-child(1)', disciplinas => {
            return disciplinas.map(disciplina => disciplina.textContent.trim())
        })

        const nota1 = await page.evaluate(
            () => Array.from(document.querySelectorAll('.tabela-conteudo .tabela-linha .col.col-2.a-center:nth-child(4)'))
                .map((nota) => nota.innerText.trim())
        )

        const nota2 = await page.evaluate(
            () => Array.from(document.querySelectorAll('.tabela-conteudo .tabela-linha .col.col-2.a-center:nth-child(5)'))
                .map((nota) => nota.innerText.trim())
        )

        const nota3 = await page.evaluate(
            () => Array.from(document.querySelectorAll('.tabela-conteudo .tabela-linha .col.col-2.a-center:nth-child(6)'))
                .map((nota) => nota.innerText.trim())
        )

        //OUTRO EXEMPLO DE COMO BUSCAR AS NOTAS PELO MÉTODO $$eval
        /*const nota1 = await page.$$eval('.tabela-conteudo .tabela-linha .col.col-2.a-center:nth-child(4)', notas => {
            return notas.map(nota => nota.textContent.trim())
        })
        */

        //MOSTRA A NOTA DAS DISCIPLINAS
        for (var i = 0; i < disciplinas.length; i++) {
            console.log(disciplinas[i] + ' -- Nota1: ' + nota1[i] + ' Nota2: ' + nota2[i] + ' Nota3: ' + nota3[i])
        }
        //JUNTA A NOTA DE CADA BIMISTRE COM CADA DISCIPLINA
        const scoreTable = {};
        for (i in disciplinas) {
            scoreTable[i] = {
                disciplina: disciplinas[i],
                nota1: nota1[i],
                nota2: nota2[i],
                nota3: nota3[i]

            }
        }

        //FECHA O NAVEGADOR PARA ENCERRAR A SESSÃO ABERTA E INICIA NOVAMENTE PARA LOGAR COM OUTRO USUÁRIO
        closeBrowser();
        startBroser();

        res.json({
            'aluno(a)': studentName.trim(),
            matricula: matriculaAluno,
            scoreTable
        })
    }
}