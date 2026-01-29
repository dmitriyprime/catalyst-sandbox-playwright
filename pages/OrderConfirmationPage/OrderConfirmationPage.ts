import { BasePage } from '../BasePage';
import { OrderConfirmationPageLocators } from './OrderConfirmationPageLocators';

export class OrderConfirmationPage extends BasePage {
  url: string = '/checkout/order-confirmation';

  readonly locators: OrderConfirmationPageLocators = new OrderConfirmationPageLocators(
    this.page.locator('#checkout-app')
  );
}
