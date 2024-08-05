const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs').promises;

async function scrapeReviewPages(initialUrl, maxComments) {
    const results = [];
    const visitedPages = new Set();
    let productName = 'Unknown Product';
    let productDetails = [];
    let productImageBase64 = '';
    let reviewsPageUrl = '';

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    });

    async function scrapeProductDetails(page) {
        console.log("Navigating to the product home page:", initialUrl);
        await page.goto(initialUrl);

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

        async function downloadImageToBase64(url) {
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data, 'binary');
            return buffer.toString('base64');
        }

        try {
            // Wait for the elements we need
            await page.waitForSelector('#productTitle');
            await page.waitForSelector('a[data-hook="see-all-reviews-link-foot"]');

            // Scrape product name and reviews page URL in parallel
            const [name, reviewsUrl] = await Promise.all([
                page.evaluate(() => {
                    const productTitleElement = document.querySelector('#productTitle');
                    return productTitleElement ? productTitleElement.innerText.trim() : 'Unknown Product';
                }),
                page.evaluate(() => {
                    const reviewLink = document.querySelector('a[data-hook="see-all-reviews-link-foot"]');
                    return reviewLink ? reviewLink.href : '';
                })
            ]);

            productName = name;
            reviewsPageUrl = reviewsUrl;

            // Scrape product details and image in parallel
            const [details, imageUrl] = await Promise.all([
                page.evaluate(() => {
                    const details = [];
                    document.querySelectorAll('.a-normal.a-spacing-micro tr').forEach(detailRow => {
                        const keyElement = detailRow.querySelector('td.a-span3 .a-text-bold');
                        const valueElement = detailRow.querySelector('td.a-span9');
                        if (keyElement && valueElement) {
                            details.push(`${keyElement.innerText.trim()}: ${valueElement.innerText.trim()}`);
                        }
                    });
                    return details.join(', ');
                }),
                page.evaluate(() => {
                    const imageElement = document.querySelector('#landingImage');
                    return imageElement ? imageElement.src : '';
                })
            ]);

            productDetails = details;
            if (imageUrl) {
                productImageBase64 = await downloadImageToBase64(imageUrl);
            }
        } catch (error) {
            console.error("Error scraping product details:", error);
        }
    }

    async function scrapeReviewPage(page, url) {
        console.log("Scraping reviews from:", url);
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        await new Promise(resolve => setTimeout(resolve, 250)); // Wait for 0.25 seconds

        // Fetch the next page URL first
        const nextPageLink = await page.evaluate(() => {
            const nextButton = document.querySelector('.a-pagination .a-last a');
            return nextButton && !nextButton.parentElement.classList.contains('a-disabled') ? nextButton.href : null;
        });

        // Scrape reviews
        await page.waitForSelector('.a-section.review.aok-relative', { timeout: 15000 });

        const reviewsOnPage = await page.evaluate(() => {
            const reviews = [];
            document.querySelectorAll('.a-section.review.aok-relative').forEach(review => {
                let title = review.querySelector('a[data-hook="review-title"]')?.innerText.trim();
                let body = review.querySelector('span[data-hook="review-body"]')?.innerText.trim();
                const rawTime = review.querySelector('span[data-hook="review-date"]')?.innerText.trim();
                const time = rawTime ? rawTime.replace(/^.*on\s/, '') : ''; // Extract just the date part

                if (!body) {
                    body = title; // Replace empty body with title
                }

                reviews.push({ title, body, time });
            });
            return reviews;
        });

        results.push(...reviewsOnPage);

        if (nextPageLink && results.length < maxComments) {
            return nextPageLink;
        } else {
            return null;
        }
    }

    async function scrapeAllReviews(initialUrl) {
        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");

        await scrapeProductDetails(page);

        if (!reviewsPageUrl) {
            console.error("No reviews page URL found.");
            await browser.close();
            return {
                initialUrl,
                productName,
                productDetails,
                productImageBase64,
                reviews: []
            };
        }

        let nextPageUrl = reviewsPageUrl;

        while (nextPageUrl && results.length < maxComments) {
            nextPageUrl = await scrapeReviewPage(page, nextPageUrl);
        }

        await page.close();
    }

    await scrapeAllReviews(initialUrl);

    await browser.close();

    return {
        initialUrl,
        productName,
        productDetails,
        productImageBase64,
        reviews: results.slice(0, maxComments)
    };
}

async function scrapeReviews(initialUrl, maxComments) {
    const resultJson = await scrapeReviewPages(initialUrl, maxComments);

    // Log the result JSON
    console.log(JSON.stringify(resultJson, null, 2));

    return resultJson;
}

module.exports = scrapeReviews;
