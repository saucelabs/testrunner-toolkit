const testMetaData = {
    urls: {
        baseURL: 'https://the-internet.herokuapp.com/',
        loginPage: 'login',
        logoutPage: 'logout'
    },
    users: {
        good: {
            username: 'tomsmith',
            secret: 'SuperSecretPassword!'
        },
        bad: {
            username: 'junk',
            secret: 'junk!'
        }
    },
    selectors: {
        username: 'input#username',
        password: 'input#password',
        loginButton: 'button[type="submit"]',
        logoutButton: 'a[href="/logout"]',
        alertDiv: 'div#flash',
    },
    content: {
        usernameFailureMsg: 'Your username is invalid!',
        logoutSuccessMsg: 'You logged out of the secure area!'
    }
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function doLogin(username, secret) {
    let pg;
    try {
        pg = (await browser.pages())[0];
        await pg.goto(testMetaData.urls.baseURL+testMetaData.urls.loginPage);
        await pg.type(testMetaData.selectors.username, username);
        await pg.type(testMetaData.selectors.password, secret);
        await pg.click(testMetaData.selectors.loginButton);
    } catch(e) {
        console.log(e);
    }
    return pg;
}

describe('Test Login Page', () => {
    describe('Login page is constructed correctly', () => {
        let page;

        beforeAll( async() => {
            await sleep(2000);
            page = (await browser.pages())[0];
        });

        test('Page is availble', async () => {
            await page.goto(testMetaData.urls.baseURL+testMetaData.urls.loginPage);
            expect(await page.url()).toContain(testMetaData.urls.loginPage);
        });

        test('Username is available', async () => {
            const usernameElement = await page.$(testMetaData.selectors.username);
            expect(usernameElement).not.toBeNull();
        });

        test('Password is available', async () => {
            const passwordElement = await page.$(testMetaData.selectors.password);
            expect(passwordElement).not.toBeNull();
        });

        test('Login button is available', async () => {
            const loginButtonElement = await page.$(testMetaData.selectors.loginButton);
            expect(loginButtonElement).not.toBeNull();
        });
    });


    describe('Login scenarios', () => {
        test('Bad credentials fail', async () => {
            const page = await doLogin(testMetaData.users.bad.username, testMetaData.users.bad.secret);
            const divAlert = await page.$(testMetaData.selectors.alertDiv);
            const alertText = await page.evaluate(divAlert => divAlert.textContent, divAlert);
            expect(alertText).toContain(testMetaData.content.usernameFailureMsg);
        });

        test('Good credentials pass', async () => {
            const page = await doLogin(testMetaData.users.good.username, testMetaData.users.good.secret);
            const divAlert = await page.$(testMetaData.selectors.alertDiv);
            expect(await page.url()).toContain('secure');
            expect(divAlert).not.toBeNull();
        });
    });

    describe('Logout scenario', () => {
        test('Can logout successfully', async () => {
            const page = await doLogin(testMetaData.users.good.username, testMetaData.users.good.secret);
            await page.click(testMetaData.selectors.logoutButton);
            const divAlert = await page.$(testMetaData.selectors.alertDiv);
            const alertText = await page.evaluate(divAlert => divAlert.textContent, divAlert);
            expect(await page.url()).toContain(testMetaData.urls.loginPage);
            expect(alertText).toContain(testMetaData.content.logoutSuccessMsg);
        });
    });

});