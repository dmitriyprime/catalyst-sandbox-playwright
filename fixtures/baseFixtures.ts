import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import { ProductDetailPage } from '../pages/ProductDetailPage/ProductDetailPage';
import { CartPage } from '../pages/CartPage/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage/CheckoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage/OrderConfirmationPage';

type BaseFixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  pdpPage: ProductDetailPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  orderConfirmationPage: OrderConfirmationPage;
};

export const test = base.extend<BaseFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  registerPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: { cookies: [], origins: [] } });
    const page = await context.newPage();
    const registerPage = new RegisterPage(page);
    await use(registerPage);
    await context.close();
  },
  pdpPage: async ({ page }, use) => {
    const pdpPage = new ProductDetailPage(page);
    await use(pdpPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
  orderConfirmationPage: async ({ page }, use) => {
    const orderConfirmationPage = new OrderConfirmationPage(page);
    await use(orderConfirmationPage);
  },
});
