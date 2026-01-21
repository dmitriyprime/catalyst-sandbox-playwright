import { test } from '../../fixtures/baseFixtures';
import { expect } from '@playwright/test';
import { loginData } from '../data/customerLoginData';

test.describe('Customer Login', { tag: ['@authentication'] }, () => {
  test.beforeEach(async ({ loginPage }) => {
    await test.step('Navigate to login page', async () => {
      await loginPage.navigate();
    });
  });

  for (const data of loginData) {
    test(`${data.testId}: ${data.description}`, { tag: data.tags }, async ({ loginPage }) => {
      await test.step('Fill in login credentials', async () => {
        await loginPage.fillEmail(data.email);
        await loginPage.fillPassword(data.password);
      });

      await test.step('Submit login form', async () => {
        await loginPage.clickLogin();
      });

      await test.step('Verify expected URL', async () => {
        await expect(loginPage.currentPage).toHaveURL(data.expectedUrl);
      });
    });
  }
});
