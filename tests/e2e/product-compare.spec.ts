import { test } from '../../fixtures/baseFixtures';
import { expect } from '@playwright/test';

test.describe('Product Compare', { tag: ['@e2e', '@compare'] }, () => {
  test(
    'TEST-E2E-005: Should compare multiple products successfully',
    {
      annotation: {
        type: 'description',
        description: 'Verifies that users can add multiple products to comparison',
      },
    },
    async ({ productListPage }) => {
      await test.step('Navigate to plants category', async () => {
        await productListPage.navigate('/plants');
      });

      await test.step('Add first product to compare', async () => {
        await productListPage.getProductCard('Snake Plant').clickAddToCompare();
      });

      await test.step('Add second product to compare', async () => {
        await productListPage.getProductCard('Pothos').clickAddToCompare();
      });

      await test.step('Navigate to compare page', async () => {
        await productListPage.clickCompareButton();
      });

      await test.step('Verify compare page is displayed', async () => {
        await expect(productListPage.currentPage).toHaveURL(/compare/i);
        await expect(productListPage.currentPage).toHaveTitle('Compare products - Test Store');
      });
    }
  );
});
