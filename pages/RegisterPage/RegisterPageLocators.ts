import { type Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class RegisterPageLocators extends BaseLocator {
  readonly firstNameInput: Locator = this.baseLocator.getByLabel(/first name/i);

  readonly firstNameInputErrorNotification: Locator = this.firstNameInput
    .locator('..')
    .locator('+ div');

  readonly lastNameInput: Locator = this.baseLocator.getByLabel(/last name/i);

  readonly lastNameInputErrorNotification: Locator = this.lastNameInput
    .locator('..')
    .locator('+ div');

  readonly emailInput: Locator = this.baseLocator.getByLabel(/email/i);

  readonly emailInputErrorNotification: Locator = this.emailInput.locator('..').locator('+ div');

  readonly passwordInput: Locator = this.baseLocator.getByLabel(/^password$/i);

  readonly passwordInputErrorNotification: Locator = this.passwordInput
    .locator('..')
    .locator('+ div');

  readonly confirmPasswordInput: Locator = this.baseLocator.getByLabel(/confirm password/i);

  readonly confirmPasswordInputErrorNotification: Locator = this.confirmPasswordInput
    .locator('..')
    .locator('+ div');

  readonly companyNameInput: Locator = this.baseLocator.getByLabel(/company name/i);

  readonly phoneNumberInput: Locator = this.baseLocator.getByLabel(/phone number/i);

  readonly addressLineOneInput: Locator = this.baseLocator.getByLabel(/address line 1/i);

  readonly addressLineOneInputErrorNotification: Locator = this.addressLineOneInput
    .locator('..')
    .locator('+ div');

  readonly addressLineTwoInput: Locator = this.baseLocator.getByLabel(/address line 2/i);

  readonly suburbCityInput: Locator = this.baseLocator.getByLabel(/suburb\/city/i);

  readonly suburbCityInputErrorNotification: Locator = this.suburbCityInput
    .locator('..')
    .locator('+ div');

  readonly stateProvinceInput: Locator = this.baseLocator.getByLabel(/state\/province/i);

  readonly stateProvinceInputErrorNotification: Locator = this.stateProvinceInput
    .locator('..')
    .locator('+ div');

  readonly zipPostcodeInput: Locator = this.baseLocator.getByLabel(/zip\/postcode/i);

  readonly zipPostcodeInputErrorNotification: Locator = this.zipPostcodeInput
    .locator('..')
    .locator('+ div');

  readonly countryInput: Locator = this.baseLocator.getByRole('combobox', {
    name: 'Country',
  });

  readonly registerButton: Locator = this.baseLocator.getByRole('button', {
    name: /create account/i,
  });

  readonly newAccountHeading: Locator = this.baseLocator.getByRole('heading', {
    name: /new account/i,
  });
}
