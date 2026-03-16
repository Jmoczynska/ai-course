import { Locator, Page } from '@playwright/test';

export class AuthPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/login');
  }

  username(): Locator {
    return this.page.getByTestId('username-input');
  }

  password(): Locator {
    return this.page.getByTestId('password-input');
  }

  submit(): Locator {
    return this.page.getByTestId('login-btn');
  }

  errorMessage(): Locator {
    return this.page.getByRole('alert');
  }

  async login(user: string, pass: string): Promise<void> {
    await this.username().fill(user);
    await this.password().fill(pass);
    await this.submit().click();
  }
}
