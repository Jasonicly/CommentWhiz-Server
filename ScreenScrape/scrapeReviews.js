const puppeteer = require('puppeteer');

async function scrapeReviews(initialUrl, maxComments) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    });
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");

    const results = [];
    let currentPageUrl = initialUrl;
    let productName = 'Unknown Product';
    let productDetails = [];
    let productDescription = [];

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
        // Scrape product name
        productName = await page.evaluate(() => {
            const productTitleElement = document.querySelector('#productTitle');
            return productTitleElement ? productTitleElement.innerText.trim() : null;
        });

        // Scrape product description
        //  productDescription = await page.evaluate(() => {
        //      const description = [];
        //      document.querySelectorAll('#feature-bullets .a-list-item').forEach(detail => {
        //          details.push(detail.innerText.trim());
        //      });
        //      return details.join(', ');
        //  });

        // Scrape product details
        productDetails = await page.evaluate(() => {
            const details = [];
            document.querySelectorAll('.a-normal.a-spacing-micro tr').forEach(detailRow => {
                const keyElement = detailRow.querySelector('td.a-span3 .a-text-bold');
                const valueElement = detailRow.querySelector('td.a-span9');
                if (keyElement && valueElement) {
                    details.push(`${keyElement.innerText.trim()}: ${valueElement.innerText.trim()}`);
                }
            });
            return details.join(', ');
        });

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
        }
    } catch (error) {
        console.error("Error navigating to reviews page:", error);
        await browser.close();
        return {
            initialUrl, 
            productName,
            productDetails,
            reviews: results
        };
    }

    // Uses the .a-section.review.aok-relative selector to find and extract review elements
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
    
    // Create the result JSON
    const resultJson = {
        initialUrl,  
        productName,
        productDetails,
        //productDescription,
        reviews: results.slice(0, maxComments)
    };
    
    // Log the result JSON
    console.log(JSON.stringify(resultJson, null, 2));
    
    return resultJson;
}

module.exports = scrapeReviews;
