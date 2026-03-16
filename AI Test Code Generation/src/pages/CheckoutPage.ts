import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  total(): Locator {
    return this.page.getByTestId('cart-total');
  }

  placeOrder(): Locator {
    return this.page.getByRole('button', { name: 'Place order' });
  }
}
