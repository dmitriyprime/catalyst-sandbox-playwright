import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import { ProductDetailPage } from '../pages/ProductDetailPage/ProductDetailPage';
import { CartPage } from '../pages/CartPage/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage/CheckoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage/OrderConfirmationPage';
import { HomePage } from '../pages/HomePage/HomePage';
import { ProductListPage } from '../pages/ProductListPage/ProductListPage';
import { SearchResultsPage } from '../pages/SearchResultsPage/SearchResultsPage';

type BaseFixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  pdpPage: ProductDetailPage;
  productListPage: ProductListPage;
  searchResultsPage: SearchResultsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  orderConfirmationPage: OrderConfirmationPage;
  homePage: HomePage;
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
  productListPage: async ({ page }, use) => {
    const productListPage = new ProductListPage(page);
    await use(productListPage);
  },
  searchResultsPage: async ({ page }, use) => {
    const searchResultsPage = new SearchResultsPage(page);
    await use(searchResultsPage);
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
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});
