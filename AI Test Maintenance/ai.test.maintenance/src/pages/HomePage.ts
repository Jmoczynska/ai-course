import { Locator, Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  private readonly mainHeading = () => this.page.getByRole('heading', { name: /reliable end-to-end testing/i });
  private readonly getStartedLink = () => this.page.getByRole('link', { name: 'Get started' });
  private readonly docsNavLink = () => this.page.getByRole('link', { name: 'Docs' });
  private readonly apiNavLink = () => this.page.getByRole('link', { name: 'API' });
  private readonly communityNavLink = () => this.page.getByRole('link', { name: 'Community' });

  async navigate() {
    await this.page.goto('/');
  }

  getMainHeading(): Locator {
    return this.mainHeading();
  }

  getDocsNavLink(): Locator {
    return this.docsNavLink();
  }

  getApiNavLink(): Locator {
    return this.apiNavLink();
  }

  getCommunityNavLink(): Locator {
    return this.communityNavLink();
  }

  async clickGetStarted() {
    await this.getStartedLink().click();
  }

  async clickDocs() {
    await this.docsNavLink().click();
  }

  async clickApi() {
    await this.apiNavLink().click();
  }

  async clickCommunity() {
    await this.communityNavLink().click();
  }
}
