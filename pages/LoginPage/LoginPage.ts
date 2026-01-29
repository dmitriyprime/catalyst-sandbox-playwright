import { BasePageWithHeader } from '../BasePageWithHeader';
import { LoginPageLocators } from './LoginPageLocators';

export class LoginPage extends BasePageWithHeader {
  url: string = '/login';

  readonly locators: LoginPageLocators = new LoginPageLocators(this.page.locator('.\\@container'));

  async fillEmail(email: string): Promise<void> {
    await this.locators.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.locators.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.locators.loginButton.click();
  }
}
