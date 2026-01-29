import { test } from '../../fixtures/baseFixtures';
import { expect } from '@playwright/test';
import { successLoginData, failureLoginData } from '../data/customerLoginData';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Customer Login', { tag: ['@authentication'] }, () => {
  test.beforeEach(async ({ loginPage }) => {
    await test.step('Navigate to login page', async () => {
      await loginPage.navigate();
    });
  });

  for (const data of successLoginData) {
    test(
      `${data.testId}: ${data.description}`,
      {
        tag: data.tags,
        annotation: { type: 'description', description: data.annotation },
      },
      async ({ loginPage }) => {
        await test.step('Fill in login credentials', async () => {
          await loginPage.fillEmail(data.email);
          await loginPage.fillPassword(data.password);
        });

        await test.step('Submit login form', async () => {
          await loginPage.clickLogin();
        });

        await test.step('Verify redirect to account orders page', async () => {
          await expect(loginPage.currentPage).toHaveURL(data.expectedUrl, {
            timeout: 10000,
          });
        });
      }
    );
  }

  for (const data of failureLoginData.filter(d => d.errorType === 'credentials')) {
    test(
      `${data.testId}: ${data.description}`,
      {
        tag: data.tags,
        annotation: { type: 'description', description: data.annotation },
      },
      async ({ loginPage }) => {
        await test.step('Fill in login credentials', async () => {
          await loginPage.fillEmail(data.email);
          await loginPage.fillPassword(data.password);
        });

        await test.step('Submit login form', async () => {
          await loginPage.clickLogin();
        });

        await test.step('Verify user remains on login page', async () => {
          await expect(loginPage.currentPage).toHaveURL(data.expectedUrl, {
            timeout: 10000,
          });
        });

        await test.step('Verify error message is displayed', async () => {
          await expect(loginPage.locators.addressOrPasswordIsIncorrectNotification).toHaveText(
            data.expectedError
          );
        });
      }
    );
  }

  for (const data of failureLoginData.filter(d => d.errorType === 'required')) {
    test(
      `${data.testId}: ${data.description}`,
      {
        tag: data.tags,
        annotation: { type: 'description', description: data.annotation },
      },
      async ({ loginPage }) => {
        await test.step('Submit login form without credentials', async () => {
          await loginPage.clickLogin();
        });

        await test.step('Verify user remains on login page', async () => {
          await expect(loginPage.currentPage).toHaveURL(data.expectedUrl, {
            timeout: 10000,
          });
        });

        await test.step('Verify required field error is displayed', async () => {
          await expect(loginPage.locators.emailRequiredNotification).toHaveText(data.expectedError);
        });
      }
    );
  }
});
