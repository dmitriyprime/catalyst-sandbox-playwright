import { BasePage } from '../BasePage';
import { CheckoutPageLocators } from './CheckoutPageLocators';

export class CheckoutPage extends BasePage {
  url: string = '/checkout';

  readonly locators: CheckoutPageLocators = new CheckoutPageLocators(
    this.page.locator('#checkout-app')
  );

  async clickShippingContinueButton(): Promise<void> {
    await this.locators.shippingContinueButton.click();
  }

  async closePopup(): Promise<void> {
    await this.page
      .getByRole('dialog', { name: 'Unable to proceed because' })
      .getByRole('button', { name: 'Ok' })
      .click();
  }

  async chooseTestPaymentProvider(): Promise<void> {
    await this.locators.testPaymentProviderOption.click();
  }

  async fillTestCreditCardCredentials(): Promise<void> {
    await this.locators.creditCardNumberInput.fill('4111111111111111');
    await this.locators.creditCardExpirationInput.fill('0127');
    await this.locators.creditCardNameInput.fill('John Doe');
    await this.locators.creditCardCvvInput.fill('123');
  }

  async clickPlaceOrderButton(): Promise<void> {
    await this.locators.placeOrderButton.click();
  }
}
