import { type Locator } from '@playwright/test';
import { BaseComponent } from '../BaseComponent';

export class HeaderComponentLocators extends BaseComponent {
  readonly homeLink: Locator = this.baseLocator.getByRole('link', { name: 'Home' });

  readonly searchButton: Locator = this.baseLocator.getByRole('button', {
    name: 'Open search popup',
  });

  readonly cartLink: Locator = this.baseLocator.getByRole('link', { name: 'Cart' });

  readonly cartItemCount: Locator = this.cartLink.locator('span, div').filter({ hasText: /^\d+$/ });

  readonly searchInput: Locator = this.baseLocator.getByPlaceholder(/search/i);

  readonly searchSubmitButton: Locator = this.baseLocator.getByRole('button', {
    name: 'Search',
    exact: true,
  });
}
