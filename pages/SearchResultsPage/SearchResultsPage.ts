import { ProductCardComponent } from '../../components/ProductCardComponent/ProductCardComponent';
import { BasePageWithHeader } from '../BasePageWithHeader';
import { SearchResultsPageLocators } from './SearchResultsPageLocators';

export class SearchResultsPage extends BasePageWithHeader {
  readonly url: string = '/search';

  readonly locators: SearchResultsPageLocators = new SearchResultsPageLocators(
    this.page.locator('main')
  );

  async getProductResultsCount(): Promise<number> {
    return await this.locators.productCards.count();
  }

  async getProductCard(productName: string): Promise<ProductCardComponent> {
    const cardLocator = this.locators.productCards.filter({
      has: this.page.locator(`span[class*="line-clamp"]:has-text("${productName}")`),
    });

    return new ProductCardComponent(cardLocator);
  }

  async hasResults(): Promise<boolean> {
    const count = await this.getProductResultsCount();
    return count > 0;
  }

  async isNoResultsMessageVisible(): Promise<boolean> {
    return await this.locators.noResultsMessage.isVisible();
  }
}
