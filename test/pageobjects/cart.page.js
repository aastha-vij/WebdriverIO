import { $ } from '@wdio/globals'
import Page from './page.js'

class CartPage extends Page {

    get appTitle() {
        return $('.title');
    }

    itemPrice() {
        return $(`.inventory_item_price`);
    }

    itemName() {
        return $(`.inventory_item_name`);
    }

    checkout(){
        return $(`#checkout`);
    }

    async verifyTitle() {
        return await this.appTitle.getText();
    }

    async verifySelectedItem() {
        return await this.itemName().getText();
    }

    async verifySelectedItemPrice() {
        return await this.itemPrice().getText();
    }

    async clickCheckoutBtn(){
        await this.checkout().click();
    }

}

export default new CartPage();
