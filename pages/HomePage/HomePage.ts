import { BasePageWithHeader } from '../BasePageWithHeader';
import { HomePageLocators } from './HomePageLocators';

export class HomePage extends BasePageWithHeader {
  readonly url: string = '/';

  readonly locators: HomePageLocators = new HomePageLocators(this.page.locator('main'));
}
