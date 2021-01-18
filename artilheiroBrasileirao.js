const axios = require('axios');
const cheerio = require('cheerio');
const e = require('express');
const url = 'https://globoesporte.globo.com/futebol/brasileirao-serie-a/';

axios.get(url).then(response => {

    const $ = cheerio.load(response.data);
    const artilheiros = [];

    $('.ranking-item-wrapper').each(function () {

        const nomeJogador = $(this).find('.jogador-nome').text();
        const posicaoJogador = $(this).find('.jogador-posicao').text();
        const numeroGols = $(this).find('.jogador-gols').text();

        artilheiros.push({
            nomeJogador,
            posicaoJogador,
            numeroGols,
        });
    });

    console.log('O artilheiro do Brasilerão é ' + artilheiros[0].nomeJogador + ' com' + artilheiros[0].numeroGols + 'gols');

}).catch(console.error);

