import { type Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class CartPageLocators extends BaseLocator {
  readonly couponCodeInput: Locator = this.baseLocator.getByRole('textbox', {
    name: 'Coupon code',
  });

  readonly applyCouponCodeButton: Locator = this.baseLocator.getByRole('button', { name: 'Apply' });

  readonly proceedToCheckoutButton: Locator = this.baseLocator.getByRole('button', {
    name: 'Proceed to checkout',
  });

  readonly cartSubtotal: Locator = this.baseLocator
    .getByLabel('Receipt Summary')
    .locator('div > dd')
    .first();

  readonly cartTotal: Locator = this.baseLocator
    .getByLabel('Receipt Summary')
    .locator('div > dd')
    .last();
}
