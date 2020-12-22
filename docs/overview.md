---
id: overview
title: Sauce Labs Testrunner Toolkit                                  
sidebar_label: Overview
---
<img src="https://img.shields.io/badge/beta!-blue?style=for-the-badge" align="left" title="Beta!">
<br />

Sauce Labs Testrunner Toolkit is a containerized testing solution that simplifies user setup, speeds up test execution time and supports native Javascript frameworks like Puppeteer and Playwright for running end-to-end web tests with Sauce Labs.

## How Testrunner Toolkit Works?
Native JavaScript testing is achieved through the combination of Sauce Labs, Jest, and the
JavaScript framework of your choice. In the current beta, the toolkit supports:

* Puppeteer
* Playwright
* TestCafe
* Cypress

This approach gives you the power and expressiveness of different test frameworks with the dashboards, infrastructure, and analytics of [Sauce Labs](https://saucelabs.com/). 

The specific framework you want to use for testing should be based on the types of tests you
need to run and the environment where you run the tests. 

In this beta, you will be able to run tests in your existing CI pipeline and benefit from the low latency. 

When tests complete, the test assets (logs, test results, and test videos) are uploaded to your [Sauce Labs account](https://app.saucelabs.com). From Sauce Labs you can review, share, and analyze the test results just as you would with any other test framework executed on Sauce Labs.

## Version and Browser Support

The specific framework and browser version support depends on the components of the Testrunner Toolkit docker images. Details and release notes for each platform are found in the links below:

* [sauce-puppeteer-runner](https://github.com/saucelabs/sauce-puppeteer-runner)
* [sauce-playwright-runner](https://github.com/saucelabs/sauce-playwright-runner)
* [sauce-testcafe-runner](https://github.com/saucelabs/sauce-testcafe-runner)
* [sauce-cypress-runner](https://github.com/saucelabs/sauce-cypress-runner)

> Each docker image tag is the 'latest' image that supports the specific framework version

<!--DOCUSAURUS_CODE_TABS-->
<!--Puppeteer-->

| Puppeteer Version | Supported Browsers                | Docker Image Tag                         |
|---------|-----------------------------------|------------------------------------------|
| 3.0.4   | <ul><li>Chrome 81.0.4044.138</li> <li>Firefox 74.0</li></ul> | [saucelabs/stt-puppeteer-jest-node:v0.2.2](https://hub.docker.com/layers/saucelabs/stt-puppeteer-jest-node/v0.2.2/images/sha256-ed9eed4ec107666858e4644d9b44ebab144cf5b68f0cae155edd22be3b146cb2?context=explore) |

<!--Playwright-->

| Playwright Version | Supported Browsers                                      | Docker Image Tag                                  |
|---------|---------------------------------------------------------|---------------------------------------------------|
| 1.4.0   | <ul><li>Chromium 86.0.4217.0</li> <li>Mozilla Firefox 78.0b5</li> <li>WebKit 14.0</li></ul> | [saucelabs/stt-playwright-jest-node:v0.2.1](https://hub.docker.com/layers/saucelabs/stt-playwright-jest-node/v0.2.1/images/sha256-4084258641418233491812a61f47ef3da7baf2dd8ae0d54e1a3125fb1fd5cf42?context=explore)         |
| 1.3.0   | <ul><li>Chromium 86.0.4217.0</li> <li>Mozilla Firefox 78.0b5</li> <li>WebKit 14.0</li></ul> | [saucelabs/stt-playwright-jest-node:v0.2.0](https://hub.docker.com/layers/saucelabs/stt-playwright-jest-node/v0.2.0/images/sha256-3f98d1d68ecb82ecf16ca72ba3d3ff75ab5c4f9e85edfe7b631069ecd2a18067?context=explore)         |
| 1.0.0   | <ul><li>Chromium 84.0.4135.0</li> <li>Mozilla Firefox 76.0b5</li></ul>             | [saucelabs/stt-playwright-jest-node:v0.1.6-alpha.1](https://hub.docker.com/layers/saucelabs/stt-playwright-jest-node/v0.1.6-alpha.1/images/sha256-301dbb659245c403b144972e06bc26a859f969e8bda2c3abbdd1756ecd692e2a?context=explore) |
|         |                                                         |                                                   |
<!--TestCafe-->
| TestCafe Version | Supported Browsers                | Docker Image Tag                    |
|---------|-----------------------------------|-------------------------------------|
| 1.8.5   | <ul><li>Chrome 81.0.4044.138</li><li>Firefox 74.0</li></ul> | [saucelabs/stt-testcafe-node:v0.1.13](https://hub.docker.com/layers/saucelabs/stt-testcafe-node/v0.1.13/images/sha256-698c954f254b3a68ba57b8ed0f6f87becf0dc7686998e02e197f306e0002fa10?context=explore) |

<!--Cypress-->

| Cypress Version | Supported Browsers                     | Docker Image Tag                    |
|---------|----------------------------------------|-------------------------------------|
| 5.6.0   | <ul><li>Chrome 81.0.4044.138</li><li>Firefox 74.0</li></ul> | [saucelabs/stt-cypress-mocha:v0.3.0](https://hub.docker.com/layers/saucelabs/stt-cypress-mocha-node/v0.3.0/images/sha256-a93da0cc76f4eb775f696a159a5f06b34df7a9248b2df0c4363724da8d83633e?context=explore)  |
| 5.5.0   | <ul><li>Chrome 81.0.4044.138</li><li>Firefox 74.0</li></ul>  | [saucelabs/stt-cypress-mocha:v0.2.3](https://hub.docker.com/layers/saucelabs/stt-cypress-mocha-node/v0.2.3/images/sha256-95b25c5a85624779c2ed9aaa82a6ca76e770a77e487936e6814f9f9c95dc1e52?context=explore)  |
| 5.4.0   | <ul><li>Chrome 81.0.4044.138</li><li>Firefox 74.0</li></ul>  | [saucelabs/stt-cypress-mocha:v0.1.18](https://hub.docker.com/layers/saucelabs/stt-cypress-mocha-node/v0.1.18/images/sha256-1709f9e55223267b0a63b33fa9f00a84920dd1c175dcd33ee0fababf5abfed50?context=explore) |
| 4.9.0   | <ul><li>Chrome 81.0.4044.138</li><li>Firefox 74.0</li></ul>  | [saucelabs/stt-cypress-mocha:v0.1.12](https://hub.docker.com/layers/saucelabs/stt-cypress-mocha-node/v0.1.12/images/sha256-7c8d0ce5bc1b0260375345bfba71e9d76dfff97fd223da0aa570e8f4715ba075?context=explore) |

<!--END_DOCUSAURUS_CODE_TABS-->