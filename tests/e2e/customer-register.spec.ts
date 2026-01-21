import { test } from '../../fixtures/baseFixtures';
import { expect } from '@playwright/test';
import { customerRegistrationData } from '../data/customerRegistrationData';

test.describe('Customer Registration via UI', () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.navigate();
  });

  test('should display registration form', async ({ registerPage }) => {
    const page = registerPage.currentPage;
    await expect(page).toHaveURL(/\/register/);
    await expect(page.getByRole('heading', { name: /New account/i })).toBeVisible();
  });

  for (const data of customerRegistrationData) {
    test(`${data.testId}: ${data.description}`, { tag: data.tags }, async ({ registerPage }) => {
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
    });
  }

  test('should show validation error for empty required fields', async ({ registerPage }) => {
    const page = registerPage.currentPage;
    // Click submit without filling any fields
    await page.getByRole('button', { name: /register|create account|sign up|submit/i }).click();

    // Expect validation errors to appear
    await expect(page.getByText(/required|please enter|cannot be empty/i).first()).toBeVisible();
  });

  test('should show error for invalid email format', async ({ registerPage }) => {
    const page = registerPage.currentPage;
    await page.getByLabel(/first name/i).fill('John');
    await page.getByLabel(/last name/i).fill('Doe');
    await page.getByLabel(/email/i).fill('invalid-email');
    await page.getByLabel(/^password$/i).fill('SecurePass123!');
    await page.getByLabel(/confirm password/i).fill('SecurePass123!');

    await page.getByRole('button', { name: /register|create account|sign up|submit/i }).click();

    await expect(page.getByText(/valid email|invalid email/i)).toBeVisible();
  });

  test('should show error for mismatched passwords', async ({ registerPage }) => {
    const page = registerPage.currentPage;
    const uniqueEmail = `test.user+${Date.now()}@example.com`;

    await page.getByLabel(/first name/i).fill('John');
    await page.getByLabel(/last name/i).fill('Doe');
    await page.getByLabel(/email/i).fill(uniqueEmail);
    await page.getByLabel(/^password$/i).fill('SecurePass123!');
    await page.getByLabel(/confirm password/i).fill('DifferentPass456!');

    await page.getByRole('button', { name: /register|create account|sign up|submit/i }).click();

    await expect(page.getByText(/password.*match|passwords.*not match/i)).toBeVisible();
  });
});
