import { type Locator } from '@playwright/test';
import { BaseLocator } from '../../pages/BaseLocator';

export class ProductCardComponentLocators extends BaseLocator {
  readonly addToCompareCheckbox: Locator = this.baseLocator.getByRole('checkbox', {
    name: 'Compare',
  });
}
