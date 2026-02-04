import { Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class SearchResultsPageLocators extends BaseLocator {
  readonly productCards: Locator = this.baseLocator.locator('article[class*="group"]');

  readonly productCardTitles: Locator = this.productCards.locator('span[class*="line-clamp"]');

  readonly noResultsMessage: Locator = this.baseLocator.getByText(/sorry, no results for/i);
}
