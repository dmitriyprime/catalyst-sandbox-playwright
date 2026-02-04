import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from '../components/HeaderComponent/HeaderComponent';

/**
 * Base page for pages that include the site header
 */
export abstract class BasePageWithHeader extends BasePage {
  readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(this.page.locator('body'));
  }
}
