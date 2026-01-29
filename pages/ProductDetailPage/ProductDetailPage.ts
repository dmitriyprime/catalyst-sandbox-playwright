import { BasePageWithHeader } from '../BasePageWithHeader';
import { ProductDetailPageLocators } from './ProductDetailPageLocators';

export class ProductDetailPage extends BasePageWithHeader {
  readonly url: string = '/';

  readonly locators: ProductDetailPageLocators = new ProductDetailPageLocators(
    this.page.locator('main')
  );

  readonly addedToCartAlert = this.page.getByRole('alert').filter({ hasText: /added to/i });

  async navigateToProduct(productSlug: string): Promise<void> {
    await this.page.goto(`/${productSlug}`);
  }

  async clickIncreaseQuantityButton(clickCount: number = 1): Promise<void> {
    await this.locators.increaseQuantityButton.click({ clickCount, delay: 200 });
  }

  async clickDecreaseQuantityButton(clickCount: number = 1): Promise<void> {
    await this.locators.decreaseQuantityButton.click({ clickCount, delay: 200 });
  }

  async clickAddToCartButton(): Promise<void> {
    await this.locators.addToCartButton.click();
  }
}
