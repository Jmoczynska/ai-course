import { Locator, Page } from '@playwright/test';

export class ResultsPage {
  constructor(private readonly page: Page) {}

  results(): Locator {
    return this.page.getByTestId('results');
  }

  items(): Locator {
    return this.page.getByTestId('result-item');
  }

  titleOf(index: number): Locator {
    return this.items().nth(index).getByText(/^(?!\$).+/).first();
  }

  priceOf(index: number): Locator {
    return this.items().nth(index).getByText(/^\$\d+(?:\.\d{2})?$/);
  }

  async getAllPrices(): Promise<number[]> {
    const count = await this.items().count();
    const prices: number[] = [];

    for (let index = 0; index < count; index += 1) {
      const rawPrice = (await this.priceOf(index).textContent()) ?? '';
      const normalized = Number(rawPrice.replace(/[^\d.]/g, ''));
      prices.push(Number.isNaN(normalized) ? 0 : normalized);
    }

    return prices;
  }
}
