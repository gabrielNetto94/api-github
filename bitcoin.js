const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://dolarhoje.com/bitcoin-hoje/';

var symbol, bitcoinValue, lastValue = -1;

setInterval(() => {
    axios.get(url).then(response => {

        const $ = cheerio.load(response.data);
        var time = new Date();
        symbol = $('.symbol').html();

        bitcoinValue = $('#nacional').val();

        if (lastValue !== bitcoinValue) {

            lastValue = bitcoinValue;

            console.log('Valor do bitcoin: ' + symbol + ' ' + bitcoinValue + ' ' + time)
        }

    }).catch(console.error);
}, 5000);

