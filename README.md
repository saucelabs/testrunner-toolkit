# Sauce Labs  Test Runner Toolkit ![BETA](https://img.shields.io/badge/beta!-blue?style=for-the-badge)

<!-- [START badges] -->
![GitHub Actions Status](https://github.com/saucelabs/saucectl/workflows/Sauce%20Pipeline%20Browser%20Tests/badge.svg)
[![CircleCI Status](https://circleci.com/gh/saucelabs/saucectl.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/saucelabs/saucectl)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![Chromium version](https://img.shields.io/badge/chromium-84.0.4131.0-blue.svg?logo=google-chrome)](https://www.chromium.org/Home)
<!-- [END badges] -->

Sauce Labs Test Runner Toolkit is a JavaScript native approach to perform browser 
testing in a CI with Sauce Labs.

<!-- [START gettingstarted] -->

## Requirements

- [Docker](https://docs.docker.com/get-docker/) installed
- Make sure the Docker daemon is running (e.g. `docker info` works in your terminal)
- A [Sauce Labs](https://saucelabs.com/) account, if you don't have one, start a [free trial](https://saucelabs.com/sign-up)


## Install

Using NPM:

```sh
npm i -g saucectl
```

or via our one line installer:

```sh
curl -L https://git.io/Jf3xX | bash
```

Would you like to inspect the content of our one line installer?
Download it, have a look and execute it:

```sh
curl -fsSL -o get_saucectl.sh https://git.io/Jf3xX
chmod 700 get_saucectl.sh
./get_saucectl.sh
```

## Connect to Sauce Labs

A Sauce Labs user name and access key are needed to post the test results. 

To authenticate yourself, the following environment variables need to be set:

- `SAUCE_USERNAME`
- `SAUCE_ACCESS_KEY`

You can export them as follows:

```sh
export SAUCE_USERNAME=<your-username>
export SAUCE_ACCESS_KEY=<your-access-key>
```

If you are using a cloud CI/CD tool, we strongly suggest to protect these values
through secrets or context variables. You can get your `SAUCE_ACCESS_KEY` from
Account > User Settings in [Sauce Labs](https://app.saucelabs.com/).


## Getting started

```sh
saucectl new
```

This command will ask you to choose a framework between 
[Puppeteer](https://github.com/puppeteer/puppeteer) and
[Playwright](https://github.com/microsoft/playwright). 

After that, a `./sauce/config.yml` file and an example test under
the `tests` directory will be created, where you can start working from.

### Run your first test

```sh
saucectl run
```

This command will run the example test based on the `./sauce/config.yml` file.

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
  base: saucelabs/sauce-puppeteer-runner
  version: latest
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

[Base image](https://hub.docker.com/r/saucelabs/testrunner-image/tags) is called `testrunner`. It contains the tooling necessary to record videos, VNC etc. Plus Chrome, and a Firefox version. 

[Base image + Playwright](https://hub.docker.com/r/saucelabs/sauce-playwright/tags) contains saucectl with different versions of Playwright.

[Base image + Puppeteer](https://hub.docker.com/r/saucelabs/sauce-puppeteer/tags) contains saucectl with different versions of Puppeteer.


## Examples

The examples here show how Pipeline testing can be used. Try them and find your own use cases.

#### Puppeteer Snippet:
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
## More about the Sauce Labs Test Runner Toolkit ![BETA](https://img.shields.io/badge/beta!-blue?style=for-the-badge)

Native JavaScript testing is achieved through the combination of Sauce Labs, Jest, and the
JavaScript framework of your choice. In the current beta, the toolkit supports 
[Puppeteer](https://github.com/puppeteer/puppeteer) and 
[Playwright](https://github.com/microsoft/playwright). This approach gives you the power and expressiveness of Jest with the dashboards, infrastructure, and analytics of 
[Sauce Labs](https://saucelabs.com/). 

The specific framework you want to use to for testing should be based on the types of tests you
need to run and the environment in which you are running them. In this beta you will be able to
run tests in your existing CI pipeline and benefit from the low latency. 

When tests are completed, logs, results, and videos will be uploaded to Sauce Labs with your
credentials. After that, you can review, share, and analyse those results just as you would from any other test executed on Sauce Labs.

To learn more about:
* Jest, visit https://jestjs.io/
* The Google Puppeteer project, visit https://developers.google.com/web/tools/puppeteer
* The Microsoft Playwright project, visit https://github.com/microsoft/playwright

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
The Sauce Labs Test Runner is part of our commitment to a world of digital confidence where each of our 
digital lives and experiences are magical. If you are thinking about getting involved, please do. This
repository is focused on helping people learn how to test their user experience. More is welcome.
 * [Contribution guidelines](./CONTRIBUTING.md)
 * [Code of conduct](./CODE_OF_CONDUCT.md)
 
<!-- [END contribution] -->
