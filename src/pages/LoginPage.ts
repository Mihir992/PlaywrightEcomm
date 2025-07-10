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

    async goto(baseURL: string) {
      await this.page.goto(baseURL); // Remove the /login
    }

    async fillUsername(uname: string) {
      await this.page.locator(this.usernameInputSelector).fill(uname);
    }

    async fillPassword(pwd: string) {
      await this.page.locator(this.passwordInputSelector).fill(pwd);
    }

  async clickLoginButton(): Promise<InventoryPage> {
    await Promise.all([
      //this.page.waitForNavigation({ waitUntil: 'load' }),
      this.page.locator(this.loginButton).click()
    ]);
    return new InventoryPage(this.page);
  }
}

