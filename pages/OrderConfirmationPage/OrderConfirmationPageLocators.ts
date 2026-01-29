import { type Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class OrderConfirmationPageLocators extends BaseLocator {
  readonly thankYouHeading: Locator = this.baseLocator.getByTestId('order-confirmation-heading');

  readonly orderNumberText: Locator = this.baseLocator.getByTestId(
    'order-confirmation-order-number-text'
  );
}
