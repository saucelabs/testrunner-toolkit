# Sauce Labs Testrunner Toolkit ![BETA](https://img.shields.io/badge/beta!-blue?style=for-the-badge)

<!-- [START badges] -->
![Build](https://github.com/saucelabs/testrunner-toolkit/workflows/Sauce%20Pipeline%20Browser%20Tests/badge.svg?branch=master)
[![CircleCI Status](https://circleci.com/gh/saucelabs/saucectl.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/saucelabs/saucectl)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![Chromium version](https://img.shields.io/badge/chromium-84.0.4131.0-blue.svg?logo=google-chrome)](https://www.chromium.org/Home)
<!-- [END badges] -->

Sauce Labs Testrunner Toolkit is a containerized testing solution that simplifies user setup, speeds up test execution time and supports native Javascript frameworks like Puppeteer and Playwright for running end-to-end web tests with Sauce Labs.

<!-- [START gettingstarted] -->

## Requirements

- [Docker](https://docs.docker.com/get-docker/) installed
- Make sure the Docker daemon is running (e.g. `docker info` works in your terminal)
- A [Sauce Labs](https://saucelabs.com/) account; if you don't have one, start a [free trial](https://saucelabs.com/sign-up)


## Install

Using NPM:

```sh
npm i -g saucectl
```

or via our one line installer:

```sh
curl -L https://saucelabs.github.io/saucectl/install | bash
```

Would you like to inspect the content of our one line installer?
Download it, have a look and execute it:

```sh
curl -fsSL -o get_saucectl.sh https://saucelabs.github.io/saucectl/install
chmod 700 get_saucectl.sh
./get_saucectl.sh
```

## Connect to Sauce Labs

A Sauce Labs user name and access key are needed to post the test results. You can get your `SAUCE_ACCESS_KEY` from
Account > User Settings in [Sauce Labs](https://app.saucelabs.com/).

To authenticate yourself, the following environment variables need to be set:

- `SAUCE_USERNAME`
- `SAUCE_ACCESS_KEY`

You can export them as follows:

```sh
export SAUCE_USERNAME=<your-username>
export SAUCE_ACCESS_KEY=<your-access-key>
```

If you are using a cloud CI/CD tool, we strongly suggest protecting these values
through secrets or context variables. 

## Getting started

```sh
saucectl new
```

This command will ask you to choose one of the frameworks: 
- [Puppeteer](https://github.com/puppeteer/puppeteer)
- [Playwright](https://github.com/microsoft/playwright)
- [TestCafe](https://github.com/DevExpress/testcafe) 

After that, a `./sauce/config.yml` file and an example test under
the `tests` directory will be created, where you can start working from.

### Run your first test

```sh
saucectl run
```

This command will run the example test based on the `./.sauce/config.yml` file.


### Using saucectl
To learn more about `saucectl` and its commands and flags,
please visit the [saucectl repository](https://github.com/saucelabs/saucectl).

### Quick demo

![Demo](https://gist.githubusercontent.com/diemol/f24bb230a0e3b41a052a1d9c1ff41f9e/raw/a325b6c1da77d4d4a804842da7307b055e7b50d2/saucectl-demo.gif)

## Configuration
`saucectl` requires a configuration file to know what tests to run and what
framework to use. By default, `.sauce/config.yml` will be the place where
`saucectl` will look for its configuration.

```yaml
# Simple puppeteer example config
apiVersion: v1
metadata:
  name: Feature XYZ
  tags:
    - e2e
    - release team
    - other tag
  build: Release $CI_COMMIT_SHORT_SHA
files:
  - ./tests/**/*.js
image:
  base: saucelabs/sauce-puppeteer-jest-node
  version: v0.1.0
sauce:
  region: us-west-1
```

If you wish to use more than one framework, or to configure different sets of
tests separately, you could use any name for the configuration file, and
specify it through `saucectl run -c ./path/to/config.yml`.

As an example, this repository uses two configurations for its pipeline. One
for [Puppeteer](./.sauce/puppeteer.yml), and one for [Playwright](./.sauce/playwright.yml).

> **NOTE:** Test files need to match `(spec|test)` in their file name so they will be automatically detected as testfiles.

<!-- [END gettingstarted] -->

<!-- [START examples] -->

## Images

All images are hosted on Docker Hub. 

[Base image](https://hub.docker.com/r/saucelabs/testrunner-image/tags)
is called `testrunner`. It contains the tooling necessary to record videos, VNC etc. Plus Chrome, and a Firefox version. 

[Base image + Playwright](https://hub.docker.com/r/saucelabs/stt-playwright-jest-node/tags)
contains saucectl with different versions of Playwright.

[Base image + Puppeteer](https://hub.docker.com/r/saucelabs/stt-puppeteer-jest-node/tags)
contains saucectl with different versions of Puppeteer.

[Base image + TestCafe](https://hub.docker.com/r/saucelabs/stt-testcafe-node/tags)
contains saucectl with different versions of TestCafe.

## Examples

The examples here show how Pipeline testing can be used. Try them and find your own use cases. Every testrunner image comes with a preconfigured setup that allows you to focus on writing tests instead of tweaking with the configurations. Our initial testrunner flavors come either with Puppeteer or Playwright as an automation framework. They will start the browser for you and expose the `browser` object ([Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v3.0.3&show=api-class-browser) / [Playwright](https://playwright.dev/#version=v1.0.1&path=docs%2Fcore-concepts.md&q=browser)) to the global scope for you to be accessible in the test:

#### Puppeteer Snippet:

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

#### Playwright Snippet:

The Playwright testrunner image also exposes a global `browser` variable that represents Playwright's [`Browser class`](https://playwright.dev/#version=v1.0.2&path=docs%2Fcore-concepts.md&q=browser). In addition to that you also have access to a pre-generated [browser context](https://playwright.dev/#version=v1.0.2&path=docs%2Fcore-concepts.md&q=browser-contexts) via `context` as well as to a [page frame](https://playwright.dev/#version=v1.0.2&path=docs%2Fcore-concepts.md&q=pages-and-frames) via `page`.

```js
describe('saucectl demo test', () => {
	test('should verify title of the page', async () => {
		await page.goto('https://www.saucedemo.com/');
		expect(await page.title()).toBe('Swag Labs');
	});
});
```
<!-- [END examples] -->


<!-- [START about] -->
## More about the Sauce Labs Testrunner Toolkit ![BETA](https://img.shields.io/badge/beta!-blue?style=for-the-badge)

Native JavaScript testing is achieved through the combination of Sauce Labs, Jest, and the
JavaScript framework of your choice. In the current beta, the toolkit supports 
[Puppeteer](https://github.com/puppeteer/puppeteer),
[Playwright](https://github.com/microsoft/playwright) and
[TestCafe](https://github.com/DevExpress/testcafe).
This approach gives you the power and expressiveness of different test frameworks with the dashboards, infrastructure, and analytics of [Sauce Labs](https://saucelabs.com/). 

The specific framework you want to use to for testing should be based on the types of tests you
need to run and the environment in which you are running them. In this beta you will be able to
run tests in your existing CI pipeline and benefit from the low latency. 

When tests are completed, logs, results, and videos will be uploaded to Sauce Labs to your account. After that, you can review, share, and analyze those results just as you would from any other test executed on Sauce Labs.

To learn more about:
* Jest, visit https://jestjs.io/
* The Google Puppeteer project, visit https://developers.google.com/web/tools/puppeteer
* The Microsoft Playwright project, visit https://github.com/microsoft/playwright
* TestCafe, visit https://devexpress.github.io/testcafe/

### Using `saucectl` in your CI/CD pipeline

This repository includes examples of CI/CD in 
[GitHub Actions Workflows](https://help.github.com/en/actions) and 
[CircleCI Pipelines](https://circleci.com/docs/2.0/configuration-reference/). Although the 
[GitHub Actions](./.github/workflows/tests.yml) and [CircleCI](./.circleci/config.yml) 
examples are included, the mechanism works with any CI/CD provider that supports containers.

<!-- [END about] -->

<!-- [START collaboration] -->
## Collaboration
There is a lot we can imagine doing next. It starts with hearing from you.
Submit issues and features [here](https://github.com/saucelabs/saucectl/issues/new/choose) - everything helps!
<!-- [END collaboration] -->

<!-- [START contribution] -->
## Contribution
The Sauce Labs Testrunner Toolkit is part of our commitment to a world of digital confidence where each of our 
digital lives and experiences are magical. If you are thinking about getting involved, please do. This
repository is focused on helping people learn how to test their user experience. More is welcome.
 * [Contribution guidelines](./CONTRIBUTING.md)
 * [Code of conduct](./CODE_OF_CONDUCT.md)
 
<!-- [END contribution] -->
