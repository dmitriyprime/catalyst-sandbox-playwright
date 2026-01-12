import { type Locator } from "@playwright/test";
import { BaseLocator } from "../BaseLocator";

export class LoginPageLocators extends BaseLocator {
  readonly emailInput: Locator = this.baseLocator.getByRole("textbox", {
    name: "Email",
  });

  readonly passwordInput: Locator = this.baseLocator.getByRole("textbox", {
    name: "Password",
  });

  readonly loginButton: Locator = this.baseLocator.getByRole("button", {
    name: "Log in",
  });

  readonly emailRequiredNotification: Locator = this.emailInput
    .locator("..")
    .locator("+ div");

  readonly passwordRequiredNotification: Locator = this.passwordInput
    .locator("..")
    .locator("+ div");

  readonly addressOrPasswordIsIncorrectNotification: Locator =
    this.loginButton.locator("+ div");
}
