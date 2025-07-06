import { Page, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly inputQtySelector = '[data-test="item-quantity"]';
  readonly cartProductNameSelector = '[data-test="inventory-item-name"]';
  readonly cartProductPriceSelector = '[data-test="inventory-item-price"]';
  readonly checkoutBtn = '[data-test="checkout"]';

  constructor(page: Page) {
    this.page = page;
  }

  async fetchCartDetails() {
    await this.page.waitForSelector(this.inputQtySelector);
    await this.page.waitForSelector(this.cartProductNameSelector);
    await this.page.waitForSelector(this.cartProductPriceSelector);

    const quantity = await this.page.locator(this.inputQtySelector).innerText();
    const name = await this.page.locator(this.cartProductNameSelector).innerText();
    const price = await this.page.locator(this.cartProductPriceSelector).innerText();
    console.log(quantity, name, price);
    return { quantity, name, price };
}

  async clickOnCheckoutButton(){
    await this.page.locator(this.checkoutBtn).click();
    await this.page.waitForURL('https://www.saucedemo.com/checkout-step-one.html');
  }
}