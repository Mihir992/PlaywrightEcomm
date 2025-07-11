import { Page, expect } from "@playwright/test";
import { CartPage } from "./CartPage";

export class InventoryPage {
  readonly page: Page;
   //readonly inventoryUrl = 'https://www.saucedemo.com/inventory.html';
  readonly productItemContainer = '[data-test="inventory-item"]';
  //readonly addToCartBtn = '[data-test="add-to-cart"]';
  readonly removeBtn = '[data-test="remove"]';
  readonly cartBtn = '[data-test="shopping-cart-link"]';
  readonly cartBadge = '[data-test="shopping-cart-badge"]';  

  constructor(page: Page) {
    this.page = page;
  }

  // 🔹 New method to navigate to the inventory page
  /*async navigateToPage() {
    await this.page.goto(this.inventoryUrl);
    await this.page.waitForSelector(this.productItemContainer, { timeout: 5000 });
  }*/

  // Method to get all products as a list
  async getAllProducts() {
    //await this.page.pause();
    const products: { name: string; description: string; price: string }[] = [];
    await this.page.waitForSelector(this.productItemContainer, { timeout: 5000 });
    const productElements = this.page.locator(this.productItemContainer);
    const count = await productElements.count(); //missing await
    console.log(`Found product container count: ${count}`);

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
      throw new Error(`Product with name "${productName}" not found`);
  }

  async clickOnAddToCartButton() {
    const addToCart = this.page.locator('button[data-test^="add-to-cart"]');
    await expect(addToCart).toBeVisible({ timeout: 5000 });
    await addToCart.click();
    await expect(this.page.locator(this.removeBtn)).toBeVisible();
}
  
<<<<<<< HEAD
  async clickCartButton(){
      await this.page.locator(this.cartBtn).click();
      this.page.waitForURL('https://www.saucedemo.com/cart.html');
    }
=======
  async clickCartButton():Promise<CartPage>{
    await Promise.all([
      this.page.locator(this.cartBtn).click(),
      this.page.waitForURL('https://www.saucedemo.com/cart.html'),
    ]);
     return new CartPage(this.page); // returns the next page object 
  }
>>>>>>> 97cadf8514680eb362ed45e166f930154e7653fd
}
