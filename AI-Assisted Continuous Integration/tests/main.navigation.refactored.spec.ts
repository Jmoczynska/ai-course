import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { testData } from '@fixtures/testData';

test.describe('Main page navigation', () => {
  let homePage!: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test.describe('Link visibility and labels', () => {
    test('TC-NAV-001: all navigation links are visible with correct labels', async () => {
      const docsLink = homePage.getDocsNavLink();
      const apiLink = homePage.getApiNavLink();
      const communityLink = homePage.getCommunityNavLink();

      await expect(docsLink).toBeVisible();
      await expect(docsLink).toHaveText(testData.navigation.docs);

      await expect(apiLink).toBeVisible();
      await expect(apiLink).toHaveText(testData.navigation.api);

      await expect(communityLink).toBeVisible();
      await expect(communityLink).toHaveText(testData.navigation.community);
    });
  });

  test.describe('Link routing', () => {
    test('TC-NAV-002: Docs link navigates to the installation guide', async ({ page }) => {
      await homePage.clickDocs();

      await expect(page).toHaveURL(testData.urls.docs);
      await expect(page.getByRole('heading', { name: testData.navigation.docsPageHeading })).toBeVisible();
    });

    test('TC-NAV-003: API link navigates to the API reference', async ({ page }) => {
      await homePage.clickApi();

      await expect(page).toHaveURL(testData.urls.api);
    });

    test('TC-NAV-004: Community link navigates to the Community page', async ({ page }) => {
      await homePage.clickCommunity();

      await expect(page).toHaveURL(testData.urls.community);
    });
  });

  // test for teams notification
  test('fail', async () => {
    expect(1).toBe(2);
  });
});
