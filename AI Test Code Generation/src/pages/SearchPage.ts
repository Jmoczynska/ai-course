import { Locator, Page } from '@playwright/test';

export class SearchPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/search');
  }

  queryInput(): Locator {
    return this.page.getByLabel('Search');
  }

  submit(): Locator {
    return this.page.getByRole('button', { name: 'Search' });
  }

  applyFilter(filterName: string): Locator {
    return this.page.getByRole('button', { name: filterName });
  }

  productResult(name: string): Locator {
    return this.page.getByRole('link', { name });
  }

  async searchFor(name: string): Promise<void> {
    await this.queryInput().fill(name);
    await this.submit().click();
  }
}
