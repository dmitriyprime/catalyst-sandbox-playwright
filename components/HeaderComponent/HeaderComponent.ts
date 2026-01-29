import { type Page } from '@playwright/test';
import { HeaderComponentLocators } from './HeaderComponentLocators';

export class HeaderComponent {
  readonly locators: HeaderComponentLocators;

  constructor(page: Page) {
    this.locators = new HeaderComponentLocators(page.getByRole('navigation', { name: 'Main' }));
  }

  async clickCart(): Promise<void> {
    await this.locators.cartLink.click();
  }

  async openSearch(): Promise<void> {
    await this.locators.searchButton.click();
  }

  async getCartCount(): Promise<string> {
    return (await this.locators.cartItemCount.textContent()) ?? '0';
  }
}
