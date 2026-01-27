import { test } from '../../fixtures/baseFixtures';
import { expect } from '@playwright/test';
import { customerRegistrationData } from '../data/customerRegistrationData';

test.describe('Customer Registration via UI', () => {
  test.beforeEach(async ({ registerPage }) => {
    await test.step('Navigate to register page', async () => {
      await registerPage.navigate();
    });
  });

  test(
    'TEST-005: Should display registration form',
    {
      tag: ['@smoke', '@registration'],
      annotation: {
        type: 'info',
        description: 'Verifies the registration page loads correctly with proper URL and heading',
      },
    },
    async ({ registerPage }) => {
      await test.step('Verify registration page is displayed', async () => {
        await expect(registerPage.currentPage).toHaveURL(/\/register/i);
        await expect(registerPage.locators.newAccountHeading).toBeVisible();
      });
    }
  );

  for (const data of customerRegistrationData) {
    test(
      `${data.testId}: ${data.description}`,
      {
        tag: data.tags,
        annotation: { type: 'info', description: data.annotation },
      },
      async ({ registerPage }) => {
        await test.step('Fill in registration credentials', async () => {
          await registerPage.fillRegistrationForm(data.regData);
        });

        await test.step('Submit create account form', async () => {
          await registerPage.clickRegister();
        });

        await test.step('Verify redirect to account orders page', async () => {
          await expect(registerPage.currentPage).toHaveURL(data.expectedUrl, {
            timeout: 10000,
          });
        });
      }
    );
  }

  test(
    'TEST-007: Should show validation error for empty required fields',
    {
      tag: ['@smoke', '@registration', '@negative'],
      annotation: {
        type: 'info',
        description:
          'Verifies that submitting an empty form displays "Required" error for all mandatory fields',
      },
    },
    async ({ registerPage }) => {
      await test.step('Submit create account form', async () => {
        await registerPage.clickRegister();
      });

      await test.step('Verify error validation messages about required fields are present', async () => {
        const requiredFieldErrors = [
          registerPage.locators.firstNameInputErrorNotification,
          registerPage.locators.lastNameInputErrorNotification,
          registerPage.locators.emailInputErrorNotification,
          registerPage.locators.passwordInputErrorNotification,
          registerPage.locators.confirmPasswordInputErrorNotification,
          registerPage.locators.addressLineOneInputErrorNotification,
          registerPage.locators.suburbCityInputErrorNotification,
          registerPage.locators.stateProvinceInputErrorNotification,
          registerPage.locators.zipPostcodeInputErrorNotification,
        ];

        for (const errorLocator of requiredFieldErrors) {
          await expect(errorLocator).toHaveText('Required');
        }
      });
    }
  );

  test(
    'TEST-008: Should show error for invalid email format',
    {
      tag: ['@smoke', '@registration', '@negative'],
      annotation: {
        type: 'info',
        description:
          'Verifies that entering an invalid email format (e.g., missing @) triggers a validation error',
      },
    },
    async ({ registerPage }) => {
      await test.step('Fill in registration credentials', async () => {
        await registerPage.fillRegistrationForm(customerRegistrationData[0].regData);
      });

      await test.step('Fill in invalid email in Email field', async () => {
        await registerPage.locators.emailInput.fill('invalid_email.com');
      });

      await test.step('Submit create account form', async () => {
        await registerPage.clickRegister();
      });

      await test.step('Verify customer is still on the account registration page', async () => {
        await expect(registerPage.currentPage).toHaveURL(/\/(register)/i, {
          timeout: 10000,
        });
      });

      await test.step('Verify validation error message is present', async () => {
        await expect(registerPage.locators.emailInputErrorNotification).toHaveText(
          'Please enter a valid email.'
        );
      });
    }
  );

  test(
    'TEST-009: Should show error for mismatched passwords',
    {
      tag: ['@smoke', '@registration', '@negative'],
      annotation: {
        type: 'info',
        description:
          'Verifies that entering different values in Password and Confirm Password fields triggers a validation error',
      },
    },
    async ({ registerPage }) => {
      await test.step('Fill in registration credentials', async () => {
        await registerPage.fillRegistrationForm(customerRegistrationData[0].regData);
      });

      await test.step('Fill in different password in Confirm password field', async () => {
        await registerPage.locators.confirmPasswordInput.fill('DifferentConfirmPassword123');
      });

      await test.step('Submit create account form', async () => {
        await registerPage.clickRegister();
      });

      await test.step('Verify customer is still on the account registration page', async () => {
        await expect(registerPage.currentPage).toHaveURL(/\/(register)/i, {
          timeout: 10000,
        });
      });

      await test.step('Verify validation error message is present', async () => {
        await expect(registerPage.locators.confirmPasswordInputErrorNotification).toHaveText(
          'The passwords did not match'
        );
      });
    }
  );
});
