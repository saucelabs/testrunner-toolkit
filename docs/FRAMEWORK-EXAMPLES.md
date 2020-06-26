<!---
id: framework-examples
title: Testrunner Toolkit Framework Examples
sidebar_label: Framework Examples
--->

# Testrunner Toolkit Framework Examples

The examples here show how Pipeline testing can be used. Try them and find your own use cases. 

Every __testrunner__ image comes with a preconfigured setup that allows you to focus on writing tests instead of tweaking with the configurations. Our initial `testrunner` flavors come either with Puppeteer, Playwright, or TestCafe as an automation framework. 

## Example Snippets
Each example will start the browser for you and expose the `browser` object ([Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v3.0.3&show=api-class-browser) / [Playwright](https://playwright.dev/#version=v1.0.1&path=docs%2Fcore-concepts.md&q=browser) / [TestCafe](https://devexpress.github.io/testcafe/documentation/reference/test-api/testcontroller/browser.html)) to the global scope for you to be accessible in the test:

<!--DOCUSAURUS_CODE_TABS-->
<!--Puppeteer-->
<br />

### Puppeteer Snippet:
Our Puppeteer testrunner image exposes `browser` into the global scope which represents an instance of its [`Browser class`](https://pptr.dev/#?product=Puppeteer&version=v3.0.4&show=api-class-browser). The browser will be initiated and shutdown by the testrunner setup.

```js
describe('saucectl demo test', () => {
	test('should verify title of the page', async () => {
		const page = (await browser.pages())[0]
		await page.goto('https://www.saucedemo.com/');
		expect(await page.title()).toBe('Swag Labs');
	});
});
```

<!--Playwright-->
<br />

### Playwright Snippet:
The Playwright testrunner image also exposes a global `browser` variable that represents Playwright's [`Browser class`](https://playwright.dev/#version=v1.0.2&path=docs%2Fcore-concepts.md&q=browser). In addition to that you also have access to a pre-generated [browser context](https://playwright.dev/#version=v1.0.2&path=docs%2Fcore-concepts.md&q=browser-contexts) via `context` as well as to a [page frame](https://playwright.dev/#version=v1.0.2&path=docs%2Fcore-concepts.md&q=pages-and-frames) via `page`.

```js
describe('saucectl demo test', () => {
	test('should verify title of the page', async () => {
		await page.goto('https://www.saucedemo.com/');
		expect(await page.title()).toBe('Swag Labs');
	});
});
```

<!--TestCafe-->
<br />

### TestCafe Snippet:
Coming Soon!

```js

```

<!--END_DOCUSAURUS_CODE_TABS-->

<br />

## What's Next
* [Testrunner Toolkit FAQs](TESTRUNNER-TOOLKIT-FAQS.md)

<!---___--->