function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const testMetaData = {
    urls: {
        baseURL: 'https://www.saucedemo.com/',
        loginPage: '',
        logoutPage: 'logout',
        inventory: 'inventory'
    },
    users: {
        good: {
            username: 'standard_user',
            secret: 'secret_sauce',
            firstname: 'Sam',
            lastname: 'Saucelaber',
            postalcode: '95030'
        },
        bad: {
            username: 'standard_user',
            secret: 'junk',
            firstname: 'Sam',
            lastname: 'Saucelaber',
            postalcode: '95030'
        },
        locked_out: {
            username: 'locked_out_user',
            secret: 'secret_sauce',
            firstname: 'Sam',
            lastname: 'Saucelaber',
            postalcode: '95030'
        },
        problem: {
            username: 'problem_user',
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
        loginErrorElement: '[data-test="error"]'
    },
    content: {
        badLoginError:'Epic sadface: Username and password do not match any user in this service',
        lockedOutError: 'Epic sadface: Sorry, this user has been locked out.',
        continueShopping: 'Continue Shopping'
    }
};

async function doLogin(pg, username, secret) {
    await pg.goto(testMetaData.urls.baseURL+testMetaData.urls.loginPage,'networkidle0');
    await pg.type(testMetaData.selectors.username, username);
    await pg.type(testMetaData.selectors.password, secret);
    await pg.click(testMetaData.selectors.loginButton);
}

describe('Login scenarios', () => {
    let page;

    beforeAll( async() => {
        await sleep(2000);
        page = (await browser.pages())[0];
    });

    test('Good credentials pass', async () => {
        await Promise.all([
            page.waitForNavigation({waitUntil:'networkidle2'}),
            doLogin(page, testMetaData.users.good.username, testMetaData.users.good.secret)
        ]);
        const imageSizes = await page.$$eval('img', image => image.map(img => img.naturalWidth));
        expect(imageSizes).not.toContain(0);
        expect(await page.url()).toContain(testMetaData.urls.inventory);
    });

    test('Bad credentials fail', async () => {
        await doLogin(page, testMetaData.users.bad.username, testMetaData.users.bad.secret);
        expect(await page.url()).not.toContain(testMetaData.urls.inventory);
        const loginErrorElement = await page.$(testMetaData.selectors.loginErrorElement);
        expect(loginErrorElement).not.toBeNull();
        const errorText = await page.evaluate(loginErrorElement => loginErrorElement.textContent, loginErrorElement);
        expect(errorText).toEqual(testMetaData.content.badLoginError);
    });

    test('Locked out user can not get in', async () => {
        await doLogin(page, testMetaData.users.locked_out.username, testMetaData.users.locked_out.secret);
        expect(await page.url()).not.toContain(testMetaData.urls.inventory);
        const loginErrorElement = await page.$(testMetaData.selectors.loginErrorElement);
        expect(loginErrorElement).not.toBeNull();
        const errorText = await page.evaluate(loginErrorElement => loginErrorElement.textContent, loginErrorElement);
        expect(errorText).toEqual(testMetaData.content.lockedOutError);
    });

    test('Problem user can login with ... validating images do not load correctly', async () => {
        await Promise.all([
            page.waitForNavigation({waitUntil:'networkidle2'}),
            doLogin(page, testMetaData.users.problem.username, testMetaData.users.problem.secret)
        ]);
        expect(await page.url()).toContain(testMetaData.urls.inventory);
        const imageSizes = await page.$$eval('img', image => image.map(img => img.naturalWidth));
        expect(imageSizes).toContain(0);
    });

});