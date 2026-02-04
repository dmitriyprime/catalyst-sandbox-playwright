import { expect } from '@playwright/test';
import { HeaderComponentLocators } from './HeaderComponentLocators';
import { BaseComponent } from '../BaseComponent';

export class HeaderComponent extends BaseComponent {
  readonly locators: HeaderComponentLocators = new HeaderComponentLocators(this.baseLocator);

  async clickCart(): Promise<void> {
    await this.locators.cartLink.click();
  }

  async openSearch(): Promise<void> {
    await this.locators.searchButton.waitFor({ state: 'visible' });
    await this.locators.searchButton.click();
    await expect(this.locators.searchInput).toBeVisible({ timeout: 5000 });
  }

  async fillSearchInput(search: string): Promise<void> {
    await this.locators.searchInput.fill(search);
  }

  async getCartCount(): Promise<string> {
    return (await this.locators.cartItemCount.textContent()) ?? '0';
  }

  async clickSearchSubmitButton(): Promise<void> {
    await this.locators.searchSubmitButton.click();
  }
}
