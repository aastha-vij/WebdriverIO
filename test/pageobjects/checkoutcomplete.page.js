import { $ } from '@wdio/globals'
import Page from './page.js'

class CheckoutCompletPage extends Page {

    get appTitle() {
        return $('.title');
    }

    get pageHeaderText() {
        return $(`.complete-header`);
    }

    get pageCompleteText() {
        return $(`.complete-text`);
    }

    get homeBtn() {
        return $(`#back-to-products`);
    }

    async verifyTitle() {
        return await this.appTitle.getText();
    }

    async verifyPageHeaderText() {
        return await this.pageHeaderText.getText();
    }

    async verifyPageCompleteText() {
        return await this.pageCompleteText.getText();
    }

    async clickBackHomeBtn() {
        await this.homeBtn.click();
    }

}

export default new CheckoutCompletPage();
