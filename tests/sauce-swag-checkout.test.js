function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const testMetaData = {
    urls: {
        baseURL: 'https://www.saucedemo.com/',
        loginPage: '',
        logoutPage: 'logout',
        inventory: 'inventory',
        cart: 'cart',
        checkout_step_one: 'checkout-step-one',
        checkout_step_two: 'checkout-step-two',
        checkout_complete: 'checkout-complete'
    },
    users: {
        good: {
            username: 'standard_user',
            secret: 'secret_sauce',
            firstname: 'Sam',
            lastname: 'Saucelaber',
            postalcode: '95030'
        }
    },
    selectors: {
        username: '#user-name',
        password: '#password',
        loginButton: '#login_button_container > div > form > input.btn_action',
        loginErrorElement: '[data-test="error"]',
        itemToBuy: '.inventory_item:nth-child(1) > .pricebar > .btn_primary',
        shoppingCart: '#shopping_cart_container > a > span',
        shoppingCartBadge: '#header_container > #shopping_cart_container > .shopping_cart_link > .svg-inline--fa > path',
        removeButton: 'div.item_pricebar > button',
        continueShoppingButton: '#cart_contents_container > div > div.cart_footer > a.btn_secondary',
        firstName : '#first-name',
        lastName : '#last-name',
        postalCode : '#postal-code',
        continueButton: '#checkout_info_container > div > form > div.checkout_buttons > input',
        firstCheckoutButton: '.cart_footer > .btn_action',
        secondCheckoutButton: '.checkout_info_wrapper > form > .checkout_buttons > .btn_primary',
        cancelButton: '.cart_cancel_link',
        summarySubTotalLabel: '.summary_subtotal_label',
        summaryTaxLabel: '.summary_tax_label',
        summaryTotalLabel: '.summary_total_label',
        finishButton: "[href='./checkout-complete.html']",
        completeHeader: '.complete-header',
        completeText: '.complete-text',
        ponyExpress: 'div.pony_express'
    },
    content: {
        continueShopping: 'Continue Shopping',
        remove: 'REMOVE',
        checkout: 'CHECKOUT',
        continue: 'CONTINUE',
        cancel: 'CANCEL',
        subtotal:'29.99',
        tax: '2.40',
        total:'32.39',
        finish: 'FINISH',
        completeHeader:'THANK YOU FOR YOUR ORDER',
        completeText:'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    }
};

async function doLogin(pg, username, secret) {
    await pg.goto(testMetaData.urls.baseURL+testMetaData.urls.loginPage,'networkidle0');
    await pg.type(testMetaData.selectors.username, username);
    await pg.type(testMetaData.selectors.password, secret);
    await pg.click(testMetaData.selectors.loginButton);
}

async function getTextOf(page, selector) {
    const item = await page.$(selector);
    return await page.evaluate(item => item.textContent, item);
}

async function getHrefOf(page, selector) {
    const item = await page.$(selector);
    return await page.evaluate(item => item.getAttribute('href'), item);
}

async function getValueOf(page, selector) {
    const item = await page.$(selector);
    return await page.evaluate(item => item.getAttribute('value'), item);
}

describe('Testing the happy path purchase flow', () => {
    test('Validate checkout flow', async () => {
        const page = (await browser.pages())[0];
        await Promise.all([
            page.waitForNavigation({waitUntil:'networkidle0', timeout:5000}),
            doLogin(page, testMetaData.users.good.username, testMetaData.users.good.secret)
        ]);
        expect(await page.url()).toContain(testMetaData.urls.inventory);
        await page.click(testMetaData.selectors.itemToBuy);
        expect(await getTextOf(page,testMetaData.selectors.shoppingCart)).toEqual('1');

        await Promise.all([
            page.waitForNavigation({waitUntil:'networkidle0', timeout:5000}),
            page.click(testMetaData.selectors.shoppingCartBadge)
        ]);
        expect(await page.url()).toContain(testMetaData.urls.cart);
        expect(await getTextOf(page,testMetaData.selectors.removeButton)).toEqual(testMetaData.content.remove);
        expect(await getTextOf(page,testMetaData.selectors.continueShoppingButton)).toEqual(testMetaData.content.continueShopping);
        expect(await getTextOf(page,testMetaData.selectors.firstCheckoutButton)).toEqual(testMetaData.content.checkout);

        await Promise.all([
            page.waitForNavigation({waitUntil:'networkidle0', timeout:5000}),
            page.click(testMetaData.selectors.firstCheckoutButton)
        ]);
        expect(await page.url()).toContain(testMetaData.urls.checkout_step_one);
        await page.click(testMetaData.selectors.firstName);
        await page.type(testMetaData.selectors.firstName, testMetaData.users.good.firstname);
        await page.click(testMetaData.selectors.lastName);
        await page.type(testMetaData.selectors.lastName, testMetaData.users.good.lastname);
        await page.click(testMetaData.selectors.postalCode);
        await page.type(testMetaData.selectors.postalCode, testMetaData.users.good.postalcode);
        expect(await getValueOf(page,testMetaData.selectors.continueButton)).toEqual(testMetaData.content.continue);
        expect(await getTextOf(page,testMetaData.selectors.cancelButton)).toEqual(testMetaData.content.cancel);
        expect(await getHrefOf(page,testMetaData.selectors.cancelButton)).toContain(testMetaData.urls.cart);

        await Promise.all([
            page.waitForNavigation({waitUntil:'networkidle0', timeout:5000}),
            page.click(testMetaData.selectors.secondCheckoutButton)
        ]);
        expect(await page.url()).toContain(testMetaData.urls.checkout_step_two);
        expect(await getTextOf(page,testMetaData.selectors.cancelButton)).toEqual(testMetaData.content.cancel);
        expect(await getTextOf(page,testMetaData.selectors.summarySubTotalLabel)).toContain(testMetaData.content.subtotal);
        expect(await getTextOf(page,testMetaData.selectors.summaryTaxLabel)).toContain(testMetaData.content.tax);
        expect(await getTextOf(page,testMetaData.selectors.summaryTotalLabel)).toContain(testMetaData.content.total);
        expect(await getTextOf(page,testMetaData.selectors.finishButton)).toContain(testMetaData.content.finish);

        await Promise.all([
            page.waitForNavigation({waitUntil:'networkidle0', timeout:5000}),
            page.click(testMetaData.selectors.finishButton)
        ]);
        expect(await page.url()).toContain(testMetaData.urls.checkout_complete);
        expect(await getTextOf(page,testMetaData.selectors.completeHeader)).toContain(testMetaData.content.completeHeader);
        expect(await getTextOf(page,testMetaData.selectors.completeText)).toContain(testMetaData.content.completeText);
        const ponyExpress = await page.$(testMetaData.selectors.ponyExpress);
        expect(ponyExpress).not.toBeNull();

    });
});