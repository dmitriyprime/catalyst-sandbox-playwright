import { test } from '../../fixtures/baseFixtures';

test.use({ storageState: './storageState.json' });
test('place order', async ({ loginPage }) => {
  await loginPage.navigate();
});
