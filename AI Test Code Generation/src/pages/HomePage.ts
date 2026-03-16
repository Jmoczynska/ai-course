import { Locator, Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  avatar(): Locator {
    return this.page.getByTestId('user-avatar');
  }
}
