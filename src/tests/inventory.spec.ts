import { test, expect } from "@playwright/test";
import { performLogin } from "../utils/loginUtils";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";

test("Fetch and interact with products on inventory page", async ({ page }) => {
  // Step 1: Login using reusable login function
  await performLogin(page);

  // Step 2: Instantiate InventoryPage
  const inventoryPage = new InventoryPage(page);

  // Step 3: Fetch and print all products
  const allProducts = await inventoryPage.getAllProducts();
  //console.log("Product List:", allProducts);

  // Step 4: Dynamically click a product by name (choose any from printed list)
  const productNameToClick = "Sauce Labs Backpack";
   //Use this instead of just clicking the product
  await inventoryPage.clickProductByName(productNameToClick);
  // Log the product name before clicking
  console.log(`Clicking on product: ${productNameToClick}`);

  //await page.pause();
  // Step 5:Now click the cart
  await inventoryPage.clickOnAddToCartButton();

  //Step 6:Click on cart button and chain to CheckoutPage
   const cartPage: CartPage = await inventoryPage.clickCartButton();
});
