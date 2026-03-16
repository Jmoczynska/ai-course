import { Locator, Page } from '@playwright/test';

export class ProductPage {
  constructor(private readonly page: Page) {}

  addToCart(): Locator {
    return this.page.getByTestId('add-to-cart-btn');
  }

  title(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  price(): Locator {
    return this.page.getByTestId('product-price');
  }
}
