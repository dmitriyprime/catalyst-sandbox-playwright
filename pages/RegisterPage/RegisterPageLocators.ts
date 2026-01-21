import { type Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class RegisterPageLocators extends BaseLocator {
  readonly firstNameInput: Locator = this.baseLocator.getByLabel(/first name/i);

  readonly lastNameInput: Locator = this.baseLocator.getByLabel(/last name/i);

  readonly emailInput: Locator = this.baseLocator.getByLabel(/email/i);

  readonly passwordInput: Locator = this.baseLocator.getByLabel(/^password$/i);

  readonly confirmPasswordInput: Locator = this.baseLocator.getByLabel(/confirm password/i);

  readonly companyNameInput: Locator = this.baseLocator.getByLabel(/company name/i);

  readonly phoneNumberInput: Locator = this.baseLocator.getByLabel(/phone number/i);

  readonly addressLineOneInput: Locator = this.baseLocator.getByLabel(/address line 1/i);

  readonly addressLineTwoInput: Locator = this.baseLocator.getByLabel(/address line 2/i);

  readonly suburbCityInput: Locator = this.baseLocator.getByLabel(/suburb\/city/i);

  readonly stateProvinceInput: Locator = this.baseLocator.getByLabel(/state\/province/i);

  readonly zipPostcodeInput: Locator = this.baseLocator.getByLabel(/zip\/postcode/i);

  readonly countryInput: Locator = this.baseLocator.getByRole('combobox', {
    name: 'Country',
  });

  readonly registerButton: Locator = this.baseLocator.getByRole('button', {
    name: /create account/i,
  });
}
