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