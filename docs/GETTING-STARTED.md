<!---
id: getting-started
title: Getting Started with Testrunner Toolkit
sidebar_label: Getting Started
--->
# Getting Started with Testrunner Toolkit
Sauce Labs Testrunner Toolkit is a containerized testing solution that simplifies user setup, speeds up test execution time and supports native Javascript frameworks like [Puppeteer](https://developers.google.com/web/tools/puppeteer), [Playwright](https://playwright.dev/), and [TestCafe](https://devexpress.github.io/testcafe/) for running end-to-end web tests with [Sauce Labs](https://saucelabs.com/).

## What You'll Need

* A [Sauce Labs](https://saucelabs.com/) account (if you don't have one, start a [free trial](https://saucelabs.com/sign-up))
* [Docker](https://docs.docker.com/get-docker/) installed
* Ensure the [Docker daemon](https://docs.docker.com/config/daemon/) is running (e.g. `docker info` works in your terminal)

## What You'll Do

1. [Install Testrunner Toolkit](#install-testrunner-toolkit) 
2. [Connect to Sauce Labs](#connect-to-sauce-labs)
3. [Setup Testrunner Toolkit](#setup-testrunner-toolkit)
4. [Run Your First Test](#run-your-first-test)

### Install Testrunner Toolkit

There are multiple ways to install the Sauce Labs Testrunner Toolkit (colloquially known as `saucectl`):

* Use [NPM](https://www.npmjs.com/)
    ```bash
    npm i -g saucectl
    ```
* Use our one line installer via command line tools such as [cURL]():
    ```bash
    curl -L https://saucelabs.github.io/saucectl/install | bash
    ```
If you would like to inspect the content of our one line installer, download it, have a look, and execute it:
    ```bash
    curl -fsSL -o get_saucectl.sh https://saucelabs.github.io/saucectl/install
    chmod 700 get_saucectl.sh
    ./get_saucectl.sh
    ```

### Connect to Sauce Labs

You need to retrieve your Sauce Labs `username` and `accessKey` in order post your test results. To retireve your Sauce Labs account credentials navigate to [Account > User Settings](https://app.saucelabs.com/user-settings).

Sauce Labs recommends as a best practice to set your account credentials as environment variables like so:

```bash
SAUCE_USERNAME='valid.username'
SAUCE_ACCESS_KEY='valid.key'
```

For specific instructions on how to set environment variables visit, the following links:
* [Set Environment Variables with Windows 10](https://www.architectryan.com/2018/08/31/how-to-change-environment-variables-on-windows-10/) 
* [Set Environment Variables with MacOS](https://apple.stackexchange.com/questions/106778/how-do-i-set-environment-variables-on-os-x)
* [Set Environment Variables with Linux](https://askubuntu.com/questions/58814/how-do-i-add-environment-variables)

> 
> If you are using a cloud CI/CD tool, we strongly suggest protecting these values through secrets or context variables.
>

### Setup Testrunner Toolkit

Before you begin testing, you must setup the Testrunner Toolkit.
1. Run the following command:
    ```bash
    saucectl new
    ```
2. Choose the desired framework following the prompt:
    * [Puppeteer](https://github.com/puppeteer/puppeteer)
    * [Playwright](https://github.com/microsoft/playwright)
    * [TestCafe](https://devexpress.github.io/testcafe) 
    
    Next, the Toolkit will automatically generate: an example tests
    * `./sauce/config.yml`
    * the `tests` directory
    * an example test: `tests/example.test.js`

### Run Your First Test

Run the following command to execute you first test:
```bash
saucectl run
```
Testrunner Toolkit will execute the test based on the information in `config.yml`. To learn more about how to configure `saucectl`, please visit the [Configuration]() section of the docs. 

### Quick demo

<!--![Demo](https://gist.githubusercontent.com/diemol/f24bb230a0e3b41a052a1d9c1ff41f9e/raw/a325b6c1da77d4d4a804842da7307b055e7b50d2/saucectl-demo.gif)-->
![Demo](assets/saucectl-demo.gif)


## What's Next
* [Configuring the Testrunner Toolkit](CONFIGURATION-EXAMPLES.md)
* [Testrunner Toolkit Framework Examples](FRAMEWORK-EXAMPLES.md)

<br />

<!---___--->