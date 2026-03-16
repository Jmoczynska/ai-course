import { expect, test } from '@playwright/test';
import { ResultsPage } from '../../src/pages/ResultsPage';
import { SearchPage } from '../../src/pages/SearchPage';

test('Search with price filter', async ({ page }) => {
  const searchPage = new SearchPage(page);
  const resultsPage = new ResultsPage(page);

  await test.step('Initialization', async () => {
    await searchPage.open();
    await expect(page).toHaveURL(/.*search/);
  });

  await test.step('User actions', async () => {
    await searchPage.queryInput().fill('Laptop');
    await searchPage.submit().click();
    await searchPage.applyFilter('Price < $1000').click();
  });

  await test.step('Verification', async () => {
    await expect(resultsPage.results()).toBeVisible();
    const prices = await resultsPage.getAllPrices();

    for (const price of prices) {
      expect(price).toBeLessThan(1000);
    }
  });
});
