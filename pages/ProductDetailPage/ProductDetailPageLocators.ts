import { type Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class ProductDetailPageLocators extends BaseLocator {
  readonly addToCartButton: Locator = this.baseLocator.getByRole('button', { name: 'Add to cart' });

  readonly increaseQuantityButton: Locator = this.baseLocator.getByRole('button', {
    name: 'Increase quantity',
  });

  readonly decreaseQuantityButton: Locator = this.baseLocator.getByRole('button', {
    name: 'Decrease quantity',
  });

  readonly addedToYourCartNotification: Locator = this.baseLocator.getByText(
    /item(s)? added to your cart/i
  );
}
