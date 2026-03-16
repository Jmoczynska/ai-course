import { expect, test } from '@playwright/test';
import { invalidUser, validUser } from '../../src/fixtures/testData';
import { AuthPage } from '../../src/pages/AuthPage';
import { HomePage } from '../../src/pages/HomePage';

test.describe('Authentication flow', () => {
  let authPage: AuthPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    homePage = new HomePage(page);

    await authPage.open();
  });

  test('Positive login', async () => {
    await authPage.login(validUser.username, validUser.password);

    await expect(homePage.avatar()).toBeVisible();
  });

  test('Negative login', async () => {
    await authPage.login(invalidUser.username, invalidUser.password);

    await expect(authPage.errorMessage()).toBeVisible();
  });
});
