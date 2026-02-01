import { chromium, expect, type FullConfig } from '@playwright/test';
import { existsSync, writeFileSync } from 'fs';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { customerRegistrationData as customerData } from './tests/data/customerRegistrationData';

const STORAGE_STATE_PATH = './storageState.json';
const TEST_USER_PATH = './.testuser.json';

async function globalSetup(config: FullConfig) {
  if (existsSync(STORAGE_STATE_PATH) && existsSync(TEST_USER_PATH)) {
    console.log('storageState.json already exists, skipping registration');
    return;
  }

  const { baseURL } = config.projects.find(p => p.name === 'chromium-e2e')?.use || {};
  const browser = await chromium.launch();
  const context = await browser.newContext({ baseURL });
  const page = await context.newPage();
  const registerPage = new RegisterPage(page);

  const testUserEmail = customerData[0].regData.email;
  const testUserPassword = customerData[0].regData.password;

  try {
    await registerPage.navigate();
    await registerPage.fillRegistrationForm(customerData[0].regData);
    await registerPage.clickRegister();

    // Wait for navigation and check for error messages
    await page.waitForLoadState('networkidle');

    const currentUrl = page.url();
    console.log('Current URL after registration:', currentUrl);

    // Check if there are any error messages on the page
    const errorMessages = await page
      .locator('[class*="error"], [class*="Error"], [role="alert"]')
      .allTextContents();
    if (errorMessages.length > 0) {
      console.log('Error messages found:', errorMessages);
    }

    await expect(registerPage.currentPage).toHaveURL(customerData[0].expectedUrl, {
      timeout: 10000,
    });
    await page.context().storageState({ path: STORAGE_STATE_PATH });

    // Store credentials for reuse in tests
    writeFileSync(
      TEST_USER_PATH,
      JSON.stringify({ email: testUserEmail, password: testUserPassword })
    );
  } finally {
    await browser.close();
  }
}

export default globalSetup;
