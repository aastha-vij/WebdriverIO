import { $, expect } from '@wdio/globals'
import Page from './page.js'

/**
 * sub page containing specific selectors and methods for a specific page
 */
class InventoryPage extends Page {
    /**
     * define selectors using getter methods
     */
    get appTitle() {
        return $('.title');
    }

    itemPrice() {
        return `.inventory_item_price`;
    }

    itemName(amount) {
        return $(`//*[text()=${amount}]/ancestor::div[@class="inventory_item_description"]//div[@data-test ="inventory-item-name"]`);
    }

    addToCart(amount) {
        return $(`//*[text()="${amount}"]/following-sibling::button`);
    }

    cartIcon() {
        return $(`.shopping_cart_badge`);
    }

    async verifyTitle() {
        return await this.appTitle.getText();
    }

    async verifyCartIconCount() {
        const displayed = await this.cartIcon().isDisplayed();
        return Array.isArray(displayed) ? displayed[0] : displayed;
    }

    async getCartIconCount() {
        const text = await this.cartIcon().getText();
        return Array.isArray(text) ? text[0] : text;
    }

    async getHighestPrice() {
        const priceElements = await $$(this.itemPrice());
        const priceTexts = await Promise.all(
            priceElements.map((el) => el.getText())
        );
        const prices = priceTexts.map((text) => {
            const str = Array.isArray(text) ? text.join('') : text;
            return parseFloat(str.replace('$', ''));
        });
        return Math.max(...prices).toString();
    }

    async clickAddToCartBtn(highest) {
        const button = this.addToCart(highest);
        let buttonText = await button.getText();
        expect(Array.isArray(buttonText) ? buttonText[0] : buttonText).toEqual('Add to cart');
        expect(await this.verifyCartIconCount()).toBe(false);

        await button.click();
        buttonText = await button.getText();
        expect(Array.isArray(buttonText) ? buttonText[0] : buttonText).toEqual('Remove');
        expect(await this.verifyCartIconCount()).toBe(true);
        expect(await this.getCartIconCount()).toEqual(`1`);
    }

    async getItemName(amount) {
        return await this.itemName(amount).getText();
    }

    async clickCartBtn() {
        await this.cartIcon().click()
    }
}

export default new InventoryPage();
