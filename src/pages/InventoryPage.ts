import { Page, expect } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly productItemContainer = '[data-test="inventory-item"]';
  readonly addToCartBtn = '[data-test="add-to-cart"]';
  readonly removeBtn = '[data-test="remove"]';
  readonly cartBtn = '[data-test="shopping-cart-link"]';
  readonly cartBadge = '[data-test="shopping-cart-badge"]';  

  constructor(page: Page) {
    this.page = page;
  }

  // Method to get all products as a list
  async getAllProducts() {
    const products: { name: string; description: string; price: string }[] = [];
    const productElements = this.page.locator(this.productItemContainer);
    const count = await productElements.count(); //missing await

    for (let i = 0; i < count; i++) {
      const item = productElements.nth(i); //access one product at a time

      const name = await item.locator('[data-test="inventory-item-name"]').innerText();
      const description = await item.locator('[data-test="inventory-item-desc"]').innerText();
      const price = await item.locator('[data-test="inventory-item-price"]').innerText();
      products.push({ name, description, price });
    }

    console.log("All Products:", products); //Print in console
    return products;
  }

  async clickProductByName(productName : string)
  {
     const productElements = this.page.locator(this.productItemContainer);
     const count = await productElements.count();
     for(let i=0;i<count;i++){
        const item = productElements.nth(i);
        const nameLocator = item.locator('[data-test="inventory-item-name"]');
        const name = await nameLocator.innerText();
        if (name.trim() === productName.trim()) {
            await nameLocator.waitFor({ state: 'visible' });
            await expect(nameLocator).toBeEnabled();
            await nameLocator.click(); // click the name link // click the name link
            return;
        }
     }
      throw new Error("Product with name `${productName}` not found");
  }

  async clickOnAddToCartButton() {
    await this.page.locator(this.addToCartBtn).click();
    await this.page.locator(this.removeBtn).isVisible();
  }
  
  async clickCartButton() {
    await this.page.locator(this.cartBtn).click();
    await this.page.waitForURL('https://www.saucedemo.com/cart.html');
  }
}
