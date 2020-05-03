# Sauce Labs  Testrunner Toolkit (Beta!)

<!-- [START badges] -->
![GitHub Actions Status](https://github.com/saucelabs/saucectl/workflows/Sauce%20Pipeline%20Browser%20Tests/badge.svg)
[![CircleCI Status](https://circleci.com/gh/saucelabs/saucectl.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/saucelabs/saucectl)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://saucelabs.com/how-to-contribute.html#your-first-pull-request)
[![Chromium version](https://img.shields.io/badge/chromium-84.0.4131.0-blue.svg?logo=google-chrome)](https://www.chromium.org/Home)
<!-- [END badges] -->

Sauce Labs  Testrunner Toolkit is a javascript native approach to performing headed and headless browser 
testing in CI with Sauce Labs.

<!-- [START gettingstarted] -->

## Install
```shell script
$ curl -L https://git.io/Jf3xX | bash
```
If you want to get the install script and get the binary manually, you can use the following instead
```shell script
$ curl -fsSL -o get_saucectl.sh https://git.io/Jf3xX
$ chmod 700 get_saucectl.sh
$ ./get_saucectl.sh
```

## Getting Started
The saucectl comes with a handy command to get up and running quickly.  The `--new` command will create a config.yml and an example test that you can start working from.
```shell script
$ saucectl --new
```


### Connecting to Sauce Labs
The Sauce Testrunner Toolkit requires your Sauce Labs user name and access key to connect to and post test results.  If you are
using a cloud CI/CD tool, we strongly suggest you secure these secrets using secrets or context variables.  You
can get your `SAUCE_ACCESS_KEY` from Account > User Settings in Sauce Labs.  If you don't have an account, you can
start a [free trial](https://saucelabs.com/sign-up)
- SAUCE_USERNAME
- SAUCE_ACCESS_KEY
 
### config.yml
The `config.yml` contains information about the framework you want
 to use, the tests you want to run, where you want to run your tests, and how you want to run them.
```yaml
apiVersion: v1
kind: Test
metadata:
  name: Example Test
  build: $GITHUB_RUN_ID
capabilities:
  - browserName: Chrome
    platformName: Windows 10
    browserVersion: latest
files:
  - ./tests/**
```

### Run a Test
Running your tests is as simple as `saucectl run`.  You can pass unique configuration to the saucectl to execute
subsets of tests through `saucectl run -c ./path/to/config.yml`.  By default it is assumed that config.yml is
located in a hidden folder called `.sauce`.
```shell script
$ saucectl run
```

<!-- [END gettingstarted] -->

<!-- [START abouttherepo] -->
## Examples

The examples here show how Pipeline testing can be used. Give it a try and find your own use cases.
<br />
#### Puppeteer Snippet:
```js
describe('Herokuapp login page is constructed correctly', () => {
    page = (await browser.pages())[0]
    test('Page is availble', async () => {
      await page.goto('https://the-internet.herokuapp.com/login');
      expect(await page.url()).toContain('login');
    });
});
```

#### Playwright Snippet:
```js
  describe('Herokuapp login page is constructed correctly', () => {
    test('Page is availble', async () => {
      await page.goto('https://the-internet.herokuapp.com/login');
      expect(await page.url()).toContain('login');
    });
  });
```
<!-- [END abouttherepo] -->


<!-- [START about] -->
## More About the Sauce Labs Testrunner Toolkit Beta

Native javascript testing is achieved through combination of Sauce Labs, Jest, and the javascript framework of
 your choice.  In the current beta, the toolkit supports Puppeteer and Playwright.  This approach gives you
 the power and expressiveness of Jest with the dashboards, infrastructure, and analytics of Sauce Labs.  The
 specific framework you want to use to perform the tests should be based on the types of tests you need to run
 and the environment in which you are running them.  In this beta, we are starting with an experiment to enable
 you to run tests with low latency in your existing CI pipeline.  By including the Sauce Labs credentials, we
 will automatically scoop up the logs, results, and videos from the test and post them to Sauce Labs.  You can
 then review, share, and compare those results just as you would from any other test on Sauce Labs.

* To learn more about Jest, visit https://jestjs.io/
* To learn more about the Google Puppeteer project, visit https://developers.google.com/web/tools/puppeteer
* To learn more about the Microsoft Playwright project, visit https://github.com/microsoft/playwright
* This repo includes examples of CI/CD in [GitHub Actions Workflows](https://help.github.com/en/actions) and [CircleCI Pipelines](https://circleci.com/docs/2.0/configuration-reference/).  Although the two 
  CI examples are included, the mechanism works with any CI/CD provider that supports containers.
<!-- [END about] -->
