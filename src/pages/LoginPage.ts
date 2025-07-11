import { Page } from "@playwright/test";
import { InventoryPage } from "./InventoryPage";

export class LoginPage{
    readonly page: Page;
    readonly usernameInputSelector = "input[data-test='username']";
    readonly passwordInputSelector = "input[data-test='password']";
    readonly loginButton = "input[data-test='login-button']";

    constructor(page : Page){
         this.page = page;
    }

    async navigateToLoginPage() {
      const baseUrl = process.env.BASE_URL;
      if (!baseUrl) throw new Error("BASE_URL not set in .env");
      await this.page.goto(baseUrl);
    }

  async fillUsername(uname: string) {
    await this.page.locator(this.usernameInputSelector).fill(uname);
  }

  async fillPassword(pwd: string) {
    await this.page.locator(this.passwordInputSelector).fill(pwd);
  }

<<<<<<< HEAD
  async clickLoginButton() {
      this.page.locator(this.loginButton).click()
=======
  async clickLoginButton():Promise<InventoryPage> {
    await Promise.all([
      this.page.locator(this.loginButton).click(),
      //const inventoryPage = new InventoryPage(this.page);
    ]);
    return new InventoryPage(this.page); // returns the next page object
>>>>>>> 97cadf8514680eb362ed45e166f930154e7653fd
  }
}

