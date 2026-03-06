import { $ } from '@wdio/globals'
import Page from './page.js'

class CheckoutOverviewPage extends Page {

    get appTitle() {
        return $('.title');
    }

    get finishBtn() {
        return $(`#finish`);
    }

    async verifyTitle() {
        return await this.appTitle.getText();
    }

    async clickFinishBtn() {
        await this.finishBtn.click();
    }

}

export default new CheckoutOverviewPage();
