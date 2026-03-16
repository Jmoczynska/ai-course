import { Locator, Page } from '@playwright/test';

export class Header {
  constructor(private readonly page: Page) {}

  cartBadge(): Locator {
    return this.page.getByTestId('cart-badge');
  }
}
