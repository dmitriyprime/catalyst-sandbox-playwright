import { chromium, expect, type FullConfig } from "@playwright/test";
import { existsSync } from "fs";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { customerRegistrationData as customerData } from "./tests/data/customerRegistrationData";

const STORAGE_STATE_PATH = "./storageState.json";

async function globalSetup(config: FullConfig) {
  if (existsSync(STORAGE_STATE_PATH)) {
    console.log("storageState.json already exists, skipping registration");
    return;
  }

  const { baseURL } =
    config.projects.find((p) => p.name === "chromium-e2e")?.use || {};
  const browser = await chromium.launch();
  const context = await browser.newContext({ baseURL });
  const page = await context.newPage();
  const registerPage = new RegisterPage(page);

  try {
    await registerPage.navigate();
    await registerPage.fillRegistrationForm(customerData[0].regData);
    await registerPage.clickRegister();
    await expect(registerPage.currentPage).toHaveURL(
      customerData[0].expectedUrl,
      {
        timeout: 10000,
      }
    );
    await page.context().storageState({ path: STORAGE_STATE_PATH });
  } finally {
    await browser.close();
  }
}

export default globalSetup;
