import { BasePage } from "../BasePage";
import { RegisterPageLocators } from "./RegisterPageLocators";
import { RegistrationFormData } from "../../types";

export class RegisterPage extends BasePage {
  readonly url: string = "/register";

  readonly locators: RegisterPageLocators = new RegisterPageLocators(
    this.page.locator(".\\@container")
  );

  private async fillFirstName(firstName: string): Promise<void> {
    await this.locators.firstNameInput.fill(firstName);
  }

  private async fillLastName(lastName: string): Promise<void> {
    await this.locators.lastNameInput.fill(lastName);
  }

  private async fillEmail(email: string): Promise<void> {
    await this.locators.emailInput.fill(email);
  }

  private async fillPassword(password: string): Promise<void> {
    await this.locators.passwordInput.fill(password);
  }

  private async fillConfirmPassword(confirmPassword: string): Promise<void> {
    await this.locators.confirmPasswordInput.fill(confirmPassword);
  }

  private async fillCompanyName(companyName: string): Promise<void> {
    await this.locators.companyNameInput.fill(companyName);
  }

  private async fillPhoneNumber(phoneNumber: string): Promise<void> {
    await this.locators.phoneNumberInput.fill(phoneNumber);
  }

  private async fillAddressLineOne(addressLineOne: string): Promise<void> {
    await this.locators.addressLineOneInput.fill(addressLineOne);
  }

  private async fillAddressLineTwo(addressLineTwo: string): Promise<void> {
    await this.locators.addressLineTwoInput.fill(addressLineTwo);
  }

  private async fillSuburbCity(suburbCity: string): Promise<void> {
    await this.locators.suburbCityInput.fill(suburbCity);
  }

  private async fillStateProvince(stateProvince: string): Promise<void> {
    await this.locators.stateProvinceInput.fill(stateProvince);
  }

  private async fillZipPostcode(zipPostcode: string): Promise<void> {
    await this.locators.zipPostcodeInput.fill(zipPostcode);
  }

  private async selectCountry(country: string) {
    await this.locators.countryInput.click();
    await this.page.getByRole("option", { name: country, exact: true }).click();
  }

  async fillRegistrationForm(regData: RegistrationFormData): Promise<void> {
    await this.fillFirstName(regData.firstName);
    await this.fillLastName(regData.lastName);
    await this.fillEmail(regData.email);
    await this.fillPassword(regData.password);
    await this.fillConfirmPassword(regData.confirmPassword);
    await this.fillCompanyName(regData.companyName);
    await this.fillPhoneNumber(regData.phoneNumber);
    await this.fillAddressLineOne(regData.addressLineOne);
    await this.fillAddressLineTwo(regData.addressLineTwo);
    await this.fillSuburbCity(regData.suburbCity);
    await this.fillStateProvince(regData.stateProvince);
    await this.fillZipPostcode(regData.zipPostcode);
    await this.selectCountry(regData.country);
  }

  async clickRegister(): Promise<void> {
    await this.locators.registerButton.click();
  }
}
