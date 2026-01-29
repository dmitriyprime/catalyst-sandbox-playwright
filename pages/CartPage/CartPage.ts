import { BasePageWithHeader } from '../BasePageWithHeader';
import { CartPageLocators } from './CartPageLocators';

export class CartPage extends BasePageWithHeader {
  url: string = '/cart';

  readonly locators: CartPageLocators = new CartPageLocators(this.page.locator('main'));

  async applyCouponCode(couponCode: string): Promise<void> {
    await this.locators.couponCodeInput.fill(couponCode);
    await this.locators.applyCouponCodeButton.click();
  }

  async clickProceedToCheckoutButton(): Promise<void> {
    await this.locators.proceedToCheckoutButton.click();
  }
}
