import { test } from "../../fixtures/baseFixtures";
import { expect } from "@playwright/test";
import { validLoginData, invalidLoginData } from "../data/customerLoginData";

test.describe("Login - Valid Credentials", { tag: ["@authentication"] }, () => {
  test.beforeEach(async ({ loginPage }) => {
    await test.step("Navigate to login page", async () => {
      await loginPage.navigate();
    });
  });

  for (const data of validLoginData) {
    test(
      `${data.testId}: ${data.description}`,
      { tag: data.tags },
      async ({ loginPage }) => {
        await test.step("Fill in login credentials", async () => {
          await loginPage.fillEmail(data.email);
          await loginPage.fillPassword(data.password);
        });

        await test.step("Submit login form", async () => {
          await loginPage.clickLogin();
        });

        await test.step("Verify redirect to account orders page", async () => {
          await expect(loginPage.currentPage).toHaveURL(data.expectedUrl);
        });
      }
    );
  }
});

test.describe(
  "Login - Invalid Credentials",
  { tag: ["@authentication", "@negative"] },
  () => {
    test.beforeEach(async ({ loginPage }) => {
      await test.step("Navigate to login page", async () => {
        await loginPage.navigate();
      });
    });

    for (const data of invalidLoginData) {
      test(
        `${data.testId}: ${data.description}`,
        { tag: data.tags },
        async ({ loginPage }) => {
          await test.step("Fill in login credentials", async () => {
            await loginPage.fillEmail(data.email);
            await loginPage.fillPassword(data.password);
          });

          await test.step("Submit login form", async () => {
            await loginPage.clickLogin();
          });

          await test.step("Verify user stays on login page", async () => {
            await expect(loginPage.currentPage).toHaveURL(data.expectedUrl);
          });
        }
      );
    }
  }
);
