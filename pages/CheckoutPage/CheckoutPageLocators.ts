import { type Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class CheckoutPageLocators extends BaseLocator {
  readonly shippingContinueButton: Locator = this.baseLocator.getByRole('button', {
    name: 'Continue',
  });

  readonly testPaymentProviderOption: Locator = this.baseLocator
    .locator('label')
    .filter({ hasText: 'Test payment' });

  readonly creditCardNumberInput: Locator = this.baseLocator
    .locator('#bigpaypay-ccNumber iframe')
    .contentFrame()
    .getByRole('textbox', { name: 'Credit Card Number' });

  readonly creditCardExpirationInput: Locator = this.baseLocator
    .locator('#bigpaypay-ccExpiry iframe')
    .contentFrame()
    .getByRole('textbox', { name: 'Expiration' });

  readonly creditCardNameInput: Locator = this.baseLocator
    .locator('#bigpaypay-ccName iframe')
    .contentFrame()
    .getByRole('textbox', { name: 'Name on Card' });

  readonly creditCardCvvInput = this.baseLocator
    .locator('#bigpaypay-ccCvv iframe')
    .contentFrame()
    .getByRole('textbox', { name: 'CVV' });

  readonly placeOrderButton: Locator = this.baseLocator.getByRole('button', {
    name: 'Place Order',
  });
}
