---
id: configuration
title: Configuring the Testrunner Toolkit
sidebar_label: Configuration
---

The Testrunner Toolkit requires a configuration file to know which tests to run, along with which framework to use.

## Basic Configuration

By default, `config.yml` is the file [`saucectl`](saucectl) looks to for its configuration.

```yaml
#Simple config.yml using puppeteer
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
  base: saucelabs/stt-puppeteer-jest-node
  version: v0.1.2
sauce:
  region: us-west-1
```

If you wish to use more than one framework, or to configure different sets of tests separately, you can use any name for the configuration file and specify it with the following command:

```bash
saucectl run -c ./path/to/config.yml
```

## Configuration Examples
Below are framework-specific configuration examples that exist in the [Testrunner Toolkit repository](https://github.com/saucelabs/testrunner-toolkit/tree/master/.sauce). The repository uses these configurations for its pipeline:

>
> **NOTE:** The test files need to match `(spec|test)` in their file name so they are automatically detected as `testfiles`.
>

<!--DOCUSAURUS_CODE_TABS-->
<!--Puppeteer-->

[__`puppeteer.yml`__](https://github.com/saucelabs/testrunner-toolkit/blob/master/.sauce/puppeteer.yml)
```yaml
apiVersion: v1
# type of object, there could be theoretically other types
# of "orchestration" in the future, e.g. network config maps etc.
kind: Test
# meta data to the test
metadata:
  name: Feature XYZ
  tags:
    - e2e
    - release team
    - other tag
  build: "Build #$BUILD_ID in $BUILD_ENV"
# Every file defined in this list will be bundled into a zip and
# uploaded to Sauce Labs.
files:
  - ./tests/puppeteer/demo.test.js
  # - ./tests/puppeteer/sauce-swag-checkout.test.js
  # - ./tests/puppeteer/sauce-swag-login.test.js
# Define a test runner image (e.g. an image to run WebdriverIO tests)
# Like in Docker, these images can be developed as Open Source projects
# and maintained by our teams, while at the same time, customers can
# build their own images as well
image:
  # while a set of properties are defined by our Yaml format
  base: saucelabs/sauce-puppeteer
  version: 3.0.4-saucectl0.6.2
```

<!--Playwright-->

[__`playwright.yml`__](https://github.com/saucelabs/testrunner-toolkit/blob/master/.sauce/playwright.yml)
```yaml
apiVersion: v1
# type of object, there could be theoretically other types
# of "orchestration" in the future, e.g. network config maps etc.
kind: Test
# meta data to the test
metadata:
  name: Feature XYZ
  tags:
    - e2e
    - release team
    - other tag
  build: "Build #$BUILD_ID in $BUILD_ENV"
# Every file defined in this list will be bundled into a zip and
# uploaded to Sauce Labs.
files:
  - ./tests/playwright/demo.test.js
# Define a test runner image (e.g. an image to run WebdriverIO tests)
# Like in Docker, these images can be developed as Open Source projects
# and maintained by our teams, while at the same time, customers can
# build their own images as well
image:
  # while a set of properties are defined by our Yaml format
  base: saucelabs/sauce-playwright
  version: 1.0.0-saucectl0.6.2
```

<!--TestCafe-->

[__`testcafe.yml`__](https://github.com/saucelabs/testrunner-toolkit/blob/master/.sauce/testcafe.yml)
```yaml
apiVersion: v1
metadata:
  name: Feature XYZ
  tags:
    - e2e
    - release team
    - other tag
  build: Release $CI_COMMIT_SHORT_SHA
files:
  - ./tests/testcafe/*.js
image:
  base: saucelabs/sauce-testcafe
  version: 1.8.5-saucectl0.6.3
```

<!--Cypress-->

[__`cypress.yml`__](https://github.com/saucelabs/testrunner-toolkit/blob/master/.sauce/cypress.yml)
```yaml
apiVersion: v1alpha
kind: cypress
sauce:
  region: us-west-1
  metadata:
    name: Testing Cypress Support
    tags:
      - e2e
      - release team
      - other tag
    build: Release $CI_COMMIT_SHORT_SHA
docker:
  image:
    name: saucelabs/stt-cypress-mocha-node
    tag: v0.2.0
cypress:
  configFile: "cypress.json"  # We determine related files based on the location of the config file.
suites:
  - name: "saucy test"
    browser: "chrome"
    config:
      env:
        hello: world
      testFiles: [ "**/*.*" ] # Cypress native glob support.
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Cross Browser Tests
If you wish to execute tests on different browsers while using Testrunner Toolkit, add the `suites` parameter to your `.sauce/config.yml`:

```yaml
suites:
  - name: "chrome"
    match: ".*.(spec|test).js$"
    settings:
      browserName: "chrome"
  - name: "firefox"
    match: ".*.(spec|test).js$"
    settings:
      browserName: "firefox"
```

### Examples

<!--DOCUSAURUS_CODE_TABS-->
<!--Puppeteer-->

```yaml
# ./.sauce/puppeteer.yml
apiVersion: v1alpha
metadata:
  name: Testing Puppeteer Support
  tags:
    - e2e
    - release team
    - other tag
  build: Release $CI_COMMIT_SHORT_SHA
files:
  - ./tests
suites:
  - name: "chrome"
    match: ".*.(spec|test).js$"
    settings:
      browserName: "chrome"
  - name: "firefox"
    match: ".*.(spec|test).js$"
    settings:
      browserName: "firefox"
image:
  base: saucelabs/stt-puppeteer-jest-node
  version: v0.1.8
sauce:
  region: us-west-1
```

<!--Playwright-->

```yaml
# ./.sauce/playwright.yml
apiVersion: v1alpha
metadata:
  name: Testing Playwright Support
  tags:
    - e2e
    - release team
    - other tag
  build: Release $CI_COMMIT_SHORT_SHA
files:
  - ./tests
suites:
  - name: "chrome"
    match: ".*.(spec|test).js$"
    settings:
      browserName: "chrome"
  - name: "firefox"
    match: ".*.(spec|test).js$"
    settings:
      browserName: "firefox"
image:
  base: saucelabs/stt-playwright-jest-node
  version: v0.1.9
sauce:
  region: us-west-1
```

<!--TestCafe-->

```yaml
apiVersion: v1alpha
metadata:
  name: Testing TestCafe Support
  tags:
    - e2e
    - release team
    - other tag
  build: Release $CI_COMMIT_SHORT_SHA
files:
  - ./tests
suites:
  - name: "chrome"
    match: ".*.(spec|test).js$"
    settings:
      browserName: "chrome"
  - name: "firefox"
    match: ".*.(spec|test).js$"
    settings:
      browserName: "firefox"
image:
  base: saucelabs/stt-testcafe-node
  version: v0.1.12
sauce:
  region: us-west-1
```

<!--Cypress-->

```yaml
apiVersion: v1alpha
kind: cypress
sauce:
  region: us-west-1
  metadata:
    name: Testing Cypress Support
    tags:
      - e2e
      - release team
      - other tag
    build: Release $CI_COMMIT_SHORT_SHA
docker:
  image:
    name: saucelabs/stt-cypress-mocha-node
    tag: v0.2.2
cypress:
  configFile: "cypress.json"  # We determine related files based on the location of the config file.
suites:
  - name: "saucy test - chrome"
    browser: "chrome"
    config:
      env:
        hello: world
      testFiles: [ "**/*.*" ] # Cypress native glob support.
  - name: "saucy test - firefox"
    browser: "firefox"
    config:
      env:
        hello: world
      testFiles: [ "**/*.*" ] # Cypress native glob support.
```

<!--END_DOCUSAURUS_CODE_TABS-->

___
