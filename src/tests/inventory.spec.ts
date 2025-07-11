import { test, expect } from "@playwright/test";
import { performLogin } from "../utils/loginUtils";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";

test.use({ storageState: 'storageState.json' }); 

test("Fetch and interact with products on inventory page", async ({ page }) => {
   // ✅ Go to the inventory page explicitly
  //await page.goto('https://www.saucedemo.com/inventory.html');

  const inventoryPage = new InventoryPage(page);

   // 🔹 Navigate to the page explicitly using method
  await inventoryPage.navigateToPage();
  await page.pause();
  const allProducts = await inventoryPage.getAllProducts();
  console.log("Product List:", allProducts);
  
  const productNameToClick = "Sauce Labs Backpack";
  console.log(`Clicking on product: ${productNameToClick}`);
  await inventoryPage.clickProductByName(productNameToClick);

  await inventoryPage.clickOnAddToCartButton();

  const cartPage: CartPage = await inventoryPage.clickCartButton();

});
