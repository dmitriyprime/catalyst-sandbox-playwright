import { test } from '../../fixtures/baseFixtures';
import { expect } from '@playwright/test';
import { customerRegistrationData } from '../data/customerRegistrationData';

test(
  'Should place order successfully',
  {
    tag: ['@smoke', '@checkout'],
    annotation: {
      type: 'info',
      description:
        'Verifies that a customer can add a product to the cart, apply a coupon, and complete the checkout process successfully.',
    },
  },
  async ({ pdpPage, cartPage, checkoutPage, orderConfirmationPage }) => {
    await test.step('Navigate to product and add to cart', async () => {
      await pdpPage.navigateToProduct('spray-bottle');
      await pdpPage.clickIncreaseQuantityButton(2);
      await pdpPage.clickDecreaseQuantityButton();
      await pdpPage.clickAddToCartButton();
      await expect(pdpPage.addedToCartAlert).toContainText('2 items added to');
      await expect(pdpPage.header.locators.cartItemCount).toHaveText('2');
    });

    await test.step('Navigate to cart and apply coupon', async () => {
      await pdpPage.header.clickCart();
      await expect(cartPage.currentPage).toHaveURL(/\/cart/i, {
        timeout: 10000,
      });
      await expect(cartPage.locators.cartSubtotal).toHaveText('$30.00');
      await expect(cartPage.locators.cartTotal).toHaveText('$30.00');
      await cartPage.applyCouponCode('W044T0GC3279');
      await expect(cartPage.locators.cartSubtotal).toHaveText('$30.00');
      await expect(cartPage.locators.cartTotal).toHaveText('$28.50');
    });

    await test.step('Proceed to checkout', async () => {
      await cartPage.clickProceedToCheckoutButton();
      await expect(checkoutPage.currentPage).toHaveURL(/\/checkout/i);
      await checkoutPage.clickShippingContinueButton();
      await checkoutPage.closePopup();
    });

    await test.step('Enter payment details and place order', async () => {
      await checkoutPage.chooseTestPaymentProvider();
      await checkoutPage.fillTestCreditCardCredentials();
      await checkoutPage.clickPlaceOrderButton();
    });

    await test.step('Verify order confirmation', async () => {
      await expect(orderConfirmationPage.currentPage).toHaveURL(/\/checkout\/order-confirmation/i, {
        timeout: 30000,
      });
      await expect(orderConfirmationPage.locators.thankYouHeading).toContainText(
        `Thank you ${customerRegistrationData[0].regData.firstName}!`
      );
      await expect(orderConfirmationPage.locators.orderNumberText).toContainText(
        'Your order number is'
      );
    });
  }
);
