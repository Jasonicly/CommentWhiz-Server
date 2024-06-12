// scrapeReviews.js
const puppeteer = require('puppeteer');

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time);
    });
}

async function scrapeReviews(initialUrl) {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");

    const results = [];
    let currentPageUrl = initialUrl;

    console.log("Navigating to the product home page:", currentPageUrl);
    await page.goto(currentPageUrl, { waitUntil: 'networkidle2' });

    try {
        // Click the "See more reviews" link
        await page.waitForSelector('a[data-hook="see-all-reviews-link-foot"]', { timeout: 30000 });
        const reviewsPageUrl = await page.evaluate(() => {
            const reviewLink = document.querySelector('a[data-hook="see-all-reviews-link-foot"]');
            return reviewLink ? reviewLink.href : null;
        });

        if (reviewsPageUrl) {
            console.log("Navigating to reviews page:", reviewsPageUrl);
            await page.goto(reviewsPageUrl, { waitUntil: 'networkidle2' });
            currentPageUrl = page.url();
        }
    } catch (error) {
        console.error("Error navigating to reviews page:", error);
        await browser.close();
        return results;
    }

    while (currentPageUrl) {
        console.log("Scraping reviews from:", currentPageUrl);
        await page.waitForSelector('.a-section.review.aok-relative', { timeout: 30000 });

        const reviewsOnPage = await page.evaluate(() => {
            const reviews = [];
            document.querySelectorAll('.a-section.review.aok-relative').forEach(review => {
                const title = review.querySelector('.review-title-content')?.innerText.trim();
                const body = review.querySelector('.review-text-content')?.innerText.trim();
                reviews.push({ title, body });
            });
            return reviews;
        });

        results.push(...reviewsOnPage);

        const nextPageLink = await page.evaluate(() => {
            const nextButton = document.querySelector('.a-pagination .a-last a');
            return nextButton && !nextButton.parentElement.classList.contains('a-disabled') ? nextButton.href : null;
        });

        if (nextPageLink) {
            currentPageUrl = nextPageLink;
            await page.goto(currentPageUrl, { waitUntil: 'networkidle2' });
            await delay(10000); // Wait to avoid rapid page loading that might seem bot-like
        } else {
            currentPageUrl = null;
        }
    }
    await browser.close();
    return results;
}

module.exports = scrapeReviews;
