import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page";
import inventoryPage from "../pageobjects/inventory.page";
import cartPage from "../pageobjects/cart.page";
import checkoutPage from "../pageobjects/checkout.page";
import checkoutoverviewPage from "../pageobjects/checkoutoverview.page";
import checkoutcompletePage from "../pageobjects/checkoutcomplete.page";

describe("Sauce Labs Backpack", () => {
  
  it("_01_Add_Highest_Priced_Product_To_Cart_And_Checkout", async () => {

    await LoginPage.login(`standard_user`, `secret_sauce`);

    let dashboardTitle = await inventoryPage.verifyTitle();
    expect(dashboardTitle[0]).toEqual(`Products`);

    let highestPricedItem = await inventoryPage.getHighestPrice();
    let selectedItem = await inventoryPage.getItemName(highestPricedItem);

    await inventoryPage.clickAddToCartBtn(highestPricedItem);
    await inventoryPage.clickCartBtn();

    let cartTitle = await cartPage.verifyTitle();
    expect(cartTitle[0]).toEqual(`Your Cart`);

    let actualItem = await cartPage.verifySelectedItem();
    expect(actualItem).toEqual(selectedItem);

    let actualItemPrice = await cartPage.verifySelectedItemPrice();
    expect(actualItemPrice[0]).toEqual("$" + highestPricedItem);

    await cartPage.clickCheckoutBtn();

    let checkoutTitle = await checkoutPage.verifyTitle();
    expect(checkoutTitle[0]).toEqual(`Checkout: Your Information`);

    await checkoutPage.clickContinueBtn();
    let errorMsg = await checkoutPage.getErrorLabel();
    expect(errorMsg[0]).toEqual(`Error: First Name is required`);

    await checkoutPage.fillFormInfo(`firstuser`, `lastuser`, `postal`);
    await checkoutPage.clickContinueBtn();

    let overviewPageTitle = await checkoutoverviewPage.verifyTitle();
    expect(overviewPageTitle[0]).toEqual(`Checkout: Overview`);

    actualItem = await cartPage.verifySelectedItem();
    expect(actualItem).toEqual(selectedItem);

    actualItemPrice = await cartPage.verifySelectedItemPrice();
    expect(actualItemPrice[0]).toEqual("$" + highestPricedItem);

    await checkoutoverviewPage.clickFinishBtn();

    let completePageTitle = await checkoutcompletePage.verifyTitle();
    expect(completePageTitle[0]).toEqual(`Checkout: Complete!`);

    let pageHeaderText = await checkoutcompletePage.verifyPageHeaderText();
    expect(pageHeaderText[0]).toEqual(`Thank you for your order!`);

    let pageCompleteText = await checkoutcompletePage.verifyPageCompleteText();
    expect(pageCompleteText[0]).toEqual(`Your order has been dispatched, and will arrive just as fast as the pony can get there!`);

    await checkoutcompletePage.clickBackHomeBtn();

    dashboardTitle = await inventoryPage.verifyTitle();
    expect(dashboardTitle[0]).toEqual(`Products`);

  });
});