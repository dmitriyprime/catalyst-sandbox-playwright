import { test } from '../../fixtures/baseFixtures';
import { expect } from '@playwright/test';

test.describe('Product Search', { tag: ['@e2e', '@search'] }, () => {
  test(
    'TEST-E2E-004: Should perform product search and display results',
    {
      annotation: {
        type: 'description',
        description: 'Verifies that users can search for products and see relevant results',
      },
    },
    async ({ homePage, searchResultsPage }) => {
      await test.step('Navigate to homepage', async () => {
        await homePage.navigate();
      });

      await test.step('Open search dialog and enter query', async () => {
        await homePage.header.openSearch();
        await homePage.header.fillSearchInput('Sansevieria');
      });

      await test.step('Submit search', async () => {
        await homePage.header.clickSearchSubmitButton();
        await expect(searchResultsPage.currentPage).toHaveURL(/\/search/);
      });

      await test.step('Verify search results are displayed', async () => {
        await expect(searchResultsPage.locators.productCards.first()).toBeVisible({
          timeout: 10000,
        });

        const resultsCount = await searchResultsPage.getProductResultsCount();
        expect(resultsCount).toBeGreaterThan(0);
        expect(await searchResultsPage.hasResults()).toBe(true);
      });
    }
  );

  test(
    'TEST-E2E-006: Should display no results message for non-existing product',
    {
      annotation: {
        type: 'description',
        description:
          'Verifies that a no results message is displayed when searching for a non-existing product',
      },
    },
    async ({ homePage, searchResultsPage }) => {
      await test.step('Navigate to homepage', async () => {
        await homePage.navigate();
      });

      await test.step('Open search dialog and enter query', async () => {
        await homePage.header.openSearch();
        await homePage.header.fillSearchInput('notExistingProductName');
      });

      await test.step('Submit search', async () => {
        await homePage.header.clickSearchSubmitButton();
        await expect(searchResultsPage.currentPage).toHaveURL(/\/search/);
      });

      await test.step('Verify no results message is displayed', async () => {
        await expect(searchResultsPage.locators.noResultsMessage).toBeVisible();
      });
    }
  );
});
