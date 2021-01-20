const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.youtube.com/feed/trending';

axios.get(url).then(response => {

    const $ = cheerio.load(response.data);

    //const a = $.attr('yt-formatted-string');
    //console.log(a)
    
    let allEls = $('*');

    let filteredEls = allEls.filter(function (i, el) {
        // this === el
        return $(this).children().length > 3;
    });

    let items = filteredEls.get();

    items.forEach(e => {
        console.log(e.name);
    });


}).catch(console.error);