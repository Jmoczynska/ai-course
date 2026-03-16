import { expect, test } from '@playwright/test';
import { Header } from '../../src/components/Header';
import { checkoutData } from '../../src/fixtures/testData';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';
import { ProductPage } from '../../src/pages/ProductPage';
import { SearchPage } from '../../src/pages/SearchPage';

test('Complete checkout flow', async ({ page }) => {
  const searchPage = new SearchPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const header = new Header(page);

  await searchPage.open();

  await searchPage.searchFor(checkoutData.productName);
  await searchPage.productResult(checkoutData.productName).click();
  await expect(productPage.title()).toHaveText(checkoutData.productName);
  await expect(productPage.price()).toHaveText(checkoutData.productPrice);
  await productPage.addToCart().click();

  await expect(header.cartBadge()).toBeVisible();
  await expect(header.cartBadge()).toHaveText(checkoutData.expectedCartBadge);

  await cartPage.proceedToCheckout().click();

  await expect(page).toHaveURL(/.*checkout/);
  await expect(checkoutPage.total()).toBeVisible();
  await expect(checkoutPage.total()).toHaveText(checkoutData.expectedTotal);
});
