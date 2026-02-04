import { BaseComponent } from '../BaseComponent';
import { ProductCardComponentLocators } from './ProductCardComponentLocators';

export class ProductCardComponent extends BaseComponent {
  readonly locators: ProductCardComponentLocators = new ProductCardComponentLocators(
    this.baseLocator
  );

  async clickAddToCompare() {
    await this.locators.addToCompareCheckbox.click();
  }
}
