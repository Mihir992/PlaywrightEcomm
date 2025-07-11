import { Page, expect } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
 
  readonly inputFirstNameSelector = '[data-test="firstName"]';
  readonly inputLastNameSelector = '[data-test="lastName"]';
  readonly inputPostalCodeSelector = '[data-test="postalCode"]';  
  readonly continueBtnSelector = '[data-test="continue"]'; 
  // Selectors for checkout summary page (adjust if needed)
  readonly checkoutSummaryNameSelector = '.inventory_item_name';
  readonly checkoutSummaryQtySelector = '.cart_quantity';
  readonly checkoutSummaryPriceSelector = '.inventory_item_price';

  constructor(page: Page) {
    this.page = page;
  }

  async fillCheckoutInfo(data: { firstName: string; lastName: string; postalcode: string }) {
    await this.page.locator(this.inputFirstNameSelector).fill(data.firstName);
    await this.page.locator(this.inputLastNameSelector).fill(data.lastName);
    await this.page.locator(this.inputPostalCodeSelector).fill(data.postalcode);
    await this.page.locator(this.continueBtnSelector).click();
  }

  async fetchCheckoutSummaryDetails() {
    // Wait for the checkout summary elements to be visible
    //await this.page.waitForSelector(this.checkoutSummaryNameSelector);

    const name = await this.page.locator(this.checkoutSummaryNameSelector).textContent();
    const quantity = await this.page.locator(this.checkoutSummaryQtySelector).textContent();
    const price = await this.page.locator(this.checkoutSummaryPriceSelector).textContent();

    return {quantity, name, price};
  }

  async verifyCalculatedTotalMatchesDisplayedTotal() {
    const itemTotalText = await this.page.locator('[data-test="subtotal-label"]').innerText(); // e.g. "Item total: $29.99"
    const taxText = await this.page.locator('[data-test="tax-label"]').innerText(); // e.g. "Tax: $2.40"
    const totalText = await this.page.locator('[data-test="total-label"]').innerText(); // e.g. "Total: $32.39"

    // Extract numeric values
    const itemTotal = parseFloat(itemTotalText.replace(/[^0-9.]/g, ''));
    const tax = parseFloat(taxText.replace(/[^0-9.]/g, ''));
    const displayedTotal = parseFloat(totalText.replace(/[^0-9.]/g, ''));

    // Calculate expected total
    const calculatedTotal = parseFloat((itemTotal + tax).toFixed(2));

    // Assertion
    expect(displayedTotal).toBe(calculatedTotal);
  }
}
