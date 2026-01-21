import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage/LoginPage';

test.use({ storageState: './storageState.json' });

test('place order', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await expect(page).toHaveURL(/login/);
});
