# BETA: Sauce Labs Pipeline Testing Examples

<!-- [START badges] -->
![Sauce Pipeline Browser Tests](https://github.com/saucelabs/saucectl/workflows/Sauce%20Pipeline%20Browser%20Tests/badge.svg)
[![Guinaut](https://circleci.com/gh/saucelabs/saucectl.svg?style=svg)](https://app.circleci.com/pipelines/github/saucelabs/saucectl)
<!-- [END badges] -->


> Sauce Labs Pipeline Testing is a javascript native approach to performing headed and headless browser testing with Sauce Labs.

<!-- [START usecases] -->
###### How does this work?

Native javascript testing is achieved through Jest + Puppeteer + Sauce Labs.  You get the power and expressiveness of Jest, the control of Puppeteer, and the integrated test platform of Sauce Labs.

* To learn more about Jest, visit https://jestjs.io/
* To learn more about the Google project Puppeteer, visit https://developers.google.com/web/tools/puppeteer

###### What is in this example?

The examples here show how Pipeline testing can be used. Give it a try and find your own use cases.

* Included are instructions for setting up CI/CD using either GitHub Actions or CircleCI Workflows.  This mechanism works with any CI/CD provider that supports containers.
* Set of example browser tests that demonstrate how you could use Pipeline Testing for browser validation
* Mechanism to populate Sauce Labs and leverage the reporting, failure analysis and other tools of a unified test platform
<!-- [END usecases] -->

<!-- [START installing] -->
## Installing `saucectl` From Script

`saucectl` has an installer script that will automatically grab the latest version of `saucectl` and install it locally.

You can fetch that script, and then execute it locally. It's well documented so that you can read through it and understand what it is doing before you run it.

```sh
$ curl -fsSL -o get_saucectl.sh https://git.io/Jf3oj
$ chmod 700 get_saucectl.sh
$ ./get_saucectl.sh
```

Yes, you can `curl -L https://git.io/Jf3oj | bash` that if you want to live on the edge.
<!-- [END installing] -->

<!-- [START getstarted] -->
<!-- [END getstarted] -->