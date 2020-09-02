# Sauce Labs Testrunner Toolkit ![BETA](https://img.shields.io/badge/beta!-blue?style=for-the-badge)

<!-- [START badges] -->
![Build](https://github.com/saucelabs/testrunner-toolkit/workflows/Sauce%20Pipeline%20Browser%20Tests/badge.svg?branch=master)
[![CircleCI Status](https://circleci.com/gh/saucelabs/saucectl.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/saucelabs/saucectl)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![Chromium version](https://img.shields.io/badge/chromium-84.0.4131.0-blue.svg?logo=google-chrome)](https://www.chromium.org/Home)
<!-- [END badges] -->

Sauce Labs Testrunner Toolkit is a containerized testing solution that simplifies user setup, speeds up test execution time and supports native Javascript frameworks like Puppeteer and Playwright for running end-to-end web tests with Sauce Labs.

__Table of Contents__
* [Requirements](#requirements)
* [Install](#install)
* [Connect to Sauce Labs](#connect-to-sauce-labs)
* [Getting Started](#getting-started)
* [Collaboration](#collaboration)
* [Contribution](#contribution)

__Full Documentation__: [https://opensource.saucelabs.com/testrunner-toolkit/](https://opensource.saucelabs.com/testrunner-toolkit/)

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

Using brew:
```sh
brew tap saucelabs/saucectl
brew install saucectl
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
- [Cypress](https://github.com/cypress-io/cypress) 

After that, a `./sauce/config.yml` file and an example test under
the `tests` directory will be created, where you can start working from.

For more Information on running your first test visit the [documentation](https://opensource.saucelabs.com/testrunner-toolkit/docs/test-preparation#run-your-first-test).

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
