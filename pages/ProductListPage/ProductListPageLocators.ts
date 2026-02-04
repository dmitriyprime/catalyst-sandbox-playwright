import { Locator } from '@playwright/test';
import { BaseLocator } from '../../pages/BaseLocator';

export class ProductListPageLocators extends BaseLocator {
  readonly compareButton: Locator = this.baseLocator.getByRole('link', { name: 'Compare' });
}
