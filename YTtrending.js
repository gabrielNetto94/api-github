const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 })

    var url = 'https://www.youtube.com/feed/trending';

    await page.goto(url);

    const videos = await page.evaluate(() =>
        Array.from(document.querySelectorAll("#grid-container > ytd-video-renderer"))
            .map(video => ({
                title: video.querySelector('#video-title > yt-formatted-string').innerHTML.trim(),
                channel: video.querySelector('#text > a').innerHTML.trim(),
                views: video.querySelector('#metadata-line > span:nth-child(1)').innerHTML.trim(),
                thumbnail: video.querySelector('#img').src
            }))
    )
    console.table(videos);
})();
