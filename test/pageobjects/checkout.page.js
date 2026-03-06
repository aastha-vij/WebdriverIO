import { $ } from '@wdio/globals'
import Page from './page.js'

class CheckoutPage extends Page {

    get appTitle() {
        return $('.title');
    }

    get firstName() {
        return $(`#first-name`);
    }

    get lastName() {
        return $(`#last-name`);
    }

    get postalCode() {
        return $(`#postal-code`);
    }

    get continueBtn() {
        return $(`#continue`);
    }

    get errorLabel() {
        return $(`[data-test="error"]`);
    }

    async verifyTitle() {
        return await this.appTitle.getText();
    }

    async clickContinueBtn() {
        await this.continueBtn.click();
    }

    async getErrorLabel() {
        return await this.errorLabel.getText();
    }

    async fillFormInfo(firstName, lastName, postalCode) {
        await this.firstName.setValue(firstName);
        await this.lastName.setValue(lastName);
        await this.postalCode.setValue(postalCode);
    }

}

export default new CheckoutPage();
