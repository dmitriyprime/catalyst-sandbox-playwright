import { ProductCardComponent } from '../../components/ProductCardComponent/ProductCardComponent';
import { BasePageWithHeader } from '../BasePageWithHeader';
import { ProductListPageLocators } from './ProductListPageLocators';

export class ProductListPage extends BasePageWithHeader {
  readonly url: string = '/';

  readonly locators: ProductListPageLocators = new ProductListPageLocators(
    this.page.locator('body')
  );

  private getBaseCardLocator = (productName: string) =>
    `//span[contains(@class, "line-clamp-2") and normalize-space(text())="${productName}"]/ancestor::article[contains(@class, "group")]`;

  async navigate(path: string = '/'): Promise<void> {
    await this.currentPage.goto(path);
  }

  getProductCard(productName: string): ProductCardComponent {
    const card = new ProductCardComponent(this.page.locator(this.getBaseCardLocator(productName)));

    return card;
  }

  async clickCompareButton(): Promise<void> {
    await this.locators.compareButton.click();
  }
}
