# Sauce Labs Testrunner Toolkit ![BETA](https://img.shields.io/badge/beta!-blue?style=for-the-badge)

<!-- [START badges] -->
![Build](https://github.com/saucelabs/testrunner-toolkit/workflows/Sauce%20Pipeline%20Browser%20Tests/badge.svg?branch=master)
[![CircleCI Status](https://circleci.com/gh/saucelabs/saucectl.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/saucelabs/saucectl)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![Chromium version](https://img.shields.io/badge/chromium-84.0.4131.0-blue.svg?logo=google-chrome)](https://www.chromium.org/Home)
<!-- [END badges] -->

Sauce Labs Testrunner Toolkit is a containerized testing solution that simplifies user setup, speeds up test execution time and supports native Javascript frameworks like Puppeteer and Playwright for running end-to-end web tests with Sauce Labs.

__Table of Contents__
1. [Requirements](#requirements)
2. [Install](#install)
3. [Connect to Sauce Labs](#connect-to-sauce-labs)
4. [Running Tests](#requirements)
5. [Configuration](#configuration)
6. [CI Pipeline Usage](#ci-pipeline-usage)
    1. [Parallelization](#parallelization)
7. [Collaboration](#collaboration)
8. [Contribution](#contribution)

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

Sauce Labs requires a `username` and an `accessKey` in order to post test results, or run tests on the Sauce Labs VMs (cypress only). Please [read the documentation](https://docs.staging.saucelabs.net/testrunner-toolkit/installation#connecting-to-sauce-labs) for more details on authentication.

> If you are using a cloud CI/CD tool, we strongly suggest protecting these values
through secrets or context variables.

## Running Tests

The following command will generate the necessary configuration, directories, and files needed to run tests:

```sh
saucectl new
```

Follow the prompts and then run the following command to execute your test runs:

```shell
saucectl run
```

For further information please read the following documentation on [how to run your tests](https://docs.staging.saucelabs.net/testrunner-toolkit/running-tests), and details about the [configuration](https://docs.staging.saucelabs.net/testrunner-toolkit/configuration).

> #### `saucectl`
>
> To learn more about `saucectl`, and its commands / flags, please visit the [reference documentation](https://docs.staging.saucelabs.net/dev/cli/saucectl).
>
> To learn how to contribute to the `saucectl` open source project, please visit the [`saucectl` repository](https://github.com/saucelabs/saucectl).

## Configuration

The configuration file is required in order for `saucectl` to know which tests to run, and which
frameworks to use. 

By default, the command `saucectl new` generates a config and places it in the following location: (`./.sauce/config.yml`). 

This location is where `saucectl` commands look for a configuration.

If you wish to use more than one framework, or to configure different sets of
tests separately, you could use any name for the configuration file, and
specify it through:
 
```shell script
saucectl run -c ./path/to/config.yml
```
Please visit the documentation for more information regarding configuration [examples](https://docs.staging.saucelabs.net/testrunner-toolkit/configuration#configuration-examples) and [explanations](https://docs.staging.saucelabs.net/dev/stt-config-reference).

> **NOTE:** We are in the middle of a transition to make our configs framework specific, i.e. the look and feel and behavior of the `config.yml` is different for each framework.
>
> This enables us to provide the user with a configuration that is much closer to the framework native experience than we've had before.


## CI Pipeline Usage

This repository includes examples of CI/CD in:
[GitHub Actions Workflows](https://help.github.com/en/actions) and 
[CircleCI Pipelines](https://circleci.com/docs/2.0/configuration-reference/). Although the 
[GitHub Actions](./.github/workflows/tests.yml) and [CircleCI](./.circleci/config.yml) 
examples are included, the mechanism works with any CI/CD provider that supports containers.

Please visit the documentation for more [CI integration examples](https://docs.staging.saucelabs.net/testrunner-toolkit/integrations).

### Parallelization

![CI Only](https://img.shields.io/badge/ci_only!-crimson?style=for-the-badge)

To speed up the test execution in CI, you can parallelize the test execution across CI machines.
The concrete setup will depend on your CI provider. [Here's an example](https://github.com/saucelabs/saucectl/blob/master/.github/workflows/test.yml#L94-L145) how to set it up for GitHub Actions.

Please visit [here](https://docs.staging.saucelabs.net/testrunner-toolkit/configuration#parallelization) for configuration details, and [here](https://docs.staging.saucelabs.net/dev/cli/saucectl#parallel) for more information about the parallelization feature and its limitations.

## Collaboration

There is a lot we can imagine doing next. It starts with hearing from you.
Submit issues and features [here](https://github.com/saucelabs/saucectl/issues/new/choose) - everything helps!

## Contribution

The Sauce Labs Testrunner Toolkit is part of our commitment to a world of digital confidence where each of our 
digital lives and experiences are magical. If you are thinking about getting involved, please do. This
repository is focused on helping people learn how to test their user experience. More is welcome.
 * [Contribution guidelines](./CONTRIBUTING.md)
 * [Code of conduct](./CODE_OF_CONDUCT.md)
 