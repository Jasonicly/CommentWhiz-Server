const puppeteer = require('puppeteer');
//const fs = require('fs');
//const path = require('path');

async function scrapeReviews(initialUrl, maxComments) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    });
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");

    const results = [];
    let currentPageUrl = initialUrl;
    //let productName = 'Unknown Product';

    console.log("Navigating to the product home page:", currentPageUrl);
    await page.goto(currentPageUrl, { waitUntil: 'domcontentloaded' });

    // Block unnecessary resources
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        const blockedTypes = ['image', 'stylesheet', 'font'];
        if (blockedTypes.includes(request.resourceType())) {
            request.abort();
        } else {
            request.continue();
        }
    });

    try {
        // Wait for and click the link to the reviews page
        await page.waitForSelector('a[data-hook="see-all-reviews-link-foot"]', { timeout: 15000 });
        const reviewsPageUrl = await page.evaluate(() => {
            const reviewLink = document.querySelector('a[data-hook="see-all-reviews-link-foot"]');
            return reviewLink ? reviewLink.href : null;
        });

        if (reviewsPageUrl) {
            console.log("Navigating to reviews page:", reviewsPageUrl);
            await page.goto(reviewsPageUrl, { waitUntil: 'domcontentloaded' });
            currentPageUrl = page.url();

             // Extract the product name after entering the reviews page
             //   productName = await page.evaluate(() => {
             //       const productTitleElement = document.querySelector('a[data-hook="product-link"]');
             //       return productTitleElement ? productTitleElement.innerText.trim() : null;
             //   });

             //   console.log("Product Name:", productName);
        }
    } catch (error) {
        console.error("Error navigating to reviews page:", error);
        await browser.close();
        return results;
    }

    // uses the .a-section.review.aok-relative selector to find and extract review elements
    while (currentPageUrl && results.length < maxComments) {
        console.log("Scraping reviews from:", currentPageUrl);
        await page.waitForSelector('.a-section.review.aok-relative', { timeout: 15000 });

        const reviewsOnPage = await page.evaluate(() => {
            const reviews = [];
            document.querySelectorAll('.a-section.review.aok-relative').forEach(review => {
                const title = review.querySelector('a[data-hook="review-title"]')?.innerText.trim();
                const body = review.querySelector('span[data-hook="review-body"]')?.innerText.trim();
                reviews.push({ title, body });
            });
            return reviews;
        });

        results.push(...reviewsOnPage);

        // Navigate to the next page of reviews if it exists
        const nextPageLink = await page.evaluate(() => {
            const nextButton = document.querySelector('.a-pagination .a-last a');
            return nextButton && !nextButton.parentElement.classList.contains('a-disabled') ? nextButton.href : null;
        });

        if (nextPageLink && results.length < maxComments) {
            currentPageUrl = nextPageLink;
            await page.goto(currentPageUrl, { waitUntil: 'domcontentloaded' });
            await new Promise(resolve => setTimeout(resolve, 5000));
        } else {
            currentPageUrl = null;
        }
    }

    await browser.close();
    return results.slice(0, maxComments);
}

module.exports = scrapeReviews;
