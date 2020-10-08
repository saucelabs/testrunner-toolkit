---
id: jenkins
title: Testrunner Toolkit with Jenkins
sidebar_label: Jenkins
---

The [`Jenkinsfile` examples](#jenkins-pipeline-examples) on this page can be applied to an existing Jenkins node, or you can opt to follow our example setup using Docker.

## What You'll Need
* [Jenkins Server](https://www.jenkins.io/doc/book/installing/)
* [Sauce Labs Account](https://saucelabs.com/sign-up)
* [Docker](https://docs.docker.com/get-docker/) (optional)

## Jenkins Setup with Docker

>
> DISCLAIMER: This Jenkins setup is for demonstration purposes only! It is NOT recommended for deployment in a production environment.
>

### Create Volume
Before starting Jenkins, create a volume to store the Testrunner Toolkit configurations and data.

```sh
docker volume create jenkins-data
```

### Start Jenkins

The below `docker` command does the following:
* sets to run as the `root` user, but this is highly __insecure!__ Contact your administrator to [properly configure users and groups](https://www.jenkins.io/doc/book/system-administration/security/#access-control)!
* deploys the container in [detached mode](https://docs.docker.com/engine/reference/run/#detached--d) so that it may run as a background process.
* names the running container "blue-ocean", to indicate the use of the Jenkins [Blue Ocean](https://plugins.jenkins.io/blueocean/) plugin.
* maps the container port `8080` to the Jenkins UI port `8080`.
* maps the `volumes` for our Jenkins data, NPM, and test framework caches.
* binds the Unix socket that the Docker daemon listens on (`-v /var/run/docker.sock`), which allows `docker` to communicate with Jenkins in order to start worker containers.
* downloads and deploys the latest [BlueOcean Docker image](https://hub.docker.com/r/jenkinsci/blueocean/).

```sh
docker run \
   -u root \
   -d \
   --name blue-ocean \
   -p 8080:8080 \
   -v jenkins-data:/var/jenkins_home \
   -v /var/run/docker.sock:/var/run/docker.sock \
   jenkinsci/blueocean:latest
```

## Jenkins Pipeline Examples
Below are some examples that utilize Testrunner Toolkit within a Jenkinsfile.
> If you're using the example Jenkins setup, these files should be stored in the volumes you created earlier. 

<!--DOCUSAURUS_CODE_TABS-->
<!--puppeteer-->

Source file: [Jenkinsfile.puppeteer](https://github.com/saucelabs/testrunner-toolkit/blob/master/.jenkins/Jenkinsfile.puppeteer)

```sh
pipeline {
  agent {
     docker {
       image 'saucelabs/stt-puppeteer-jest-node:latest'
     }
  }

  stages {
    environment {
      // it can load the record key variable from credentials store
      // see https://jenkins.io/doc/book/using/using-credentials/
      // https://www.jenkins.io/doc/book/pipeline/jenkinsfile/#handling-credentials
      SAUCE_USERNAME = credentials('sauce-username')
      SAUCE_ACCESS_KEY = credentials('sauce-access-key')
    }

    stage('run') {
      steps {
        // This step trigger the test 
        sh 'cd ~/app && saucectl run -c ./.sauce/puppeteer.yml'
      }
    }
  }
}
```

<!--playwright-->

Source file: [Jenkinsfile.playwright](https://github.com/saucelabs/testrunner-toolkit/blob/master/.jenkins/Jenkinsfile.playwright)

```sh
pipeline {
  agent {
     docker {
       image 'saucelabs/stt-playwright-jest-node:latest'
     }
  }

  stages {
    environment {
      // it can load the record key variable from credentials store
      // see https://jenkins.io/doc/book/using/using-credentials/
      // https://www.jenkins.io/doc/book/pipeline/jenkinsfile/#handling-credentials
      SAUCE_USERNAME = credentials('sauce-username')
      SAUCE_ACCESS_KEY = credentials('sauce-access-key')
    }

    stage('run') {
      steps {
        // This step trigger the test 
        sh 'cd ~/app && saucectl run -c ./.sauce/playwright.yml'
      }
    }
  }
}
```

<!--testcafe-->

Source file: [Jenkins.testcafe](https://github.com/saucelabs/testrunner-toolkit/blob/master/.jenkins/Jenkinsfile.testcafe)

```sh
pipeline {
  agent {
     docker {
       image 'saucelabs/stt-testcafe-node:latest'
     }
  }

  stages {
    environment {
      // it can load the record key variable from credentials store
      // see https://jenkins.io/doc/book/using/using-credentials/
      // https://www.jenkins.io/doc/book/pipeline/jenkinsfile/#handling-credentials
      SAUCE_USERNAME = credentials('sauce-username')
      SAUCE_ACCESS_KEY = credentials('sauce-access-key')
    }

    stage('run') {
      steps {
        // This step trigger the test 
        sh 'cd ~/app && saucectl run -c ./.sauce/testcafe.yml'
      }
    }
  }
}
```

<!--cypress-->

Source file: [Jenkins.cypress](https://github.com/saucelabs/testrunner-toolkit/blob/master/.jenkins/Jenkinsfile.cypress)

```sh
pipeline {
  agent {
     docker {
       image 'saucelabs/stt-cypress-mocha-node:latest'
     }
  }

  stages {
    environment {
      // it can load the record key variable from credentials store
      // see https://jenkins.io/doc/book/using/using-credentials/
      // https://www.jenkins.io/doc/book/pipeline/jenkinsfile/#handling-credentials
      SAUCE_USERNAME = credentials('sauce-username')
      SAUCE_ACCESS_KEY = credentials('sauce-access-key')
    }

    stage('run') {
      steps {
        // This step trigger the test 
        echo 'Run Sauce Pipeline Test'
        sh 'cd ~/app && saucectl run -c ./.sauce/cypress.yml'
      }
    }
  }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Running Parallel Tests

>
> **WARNING:** Using the parrallelization feature is highly experimental. For more information please [visit this page](cli-reference.md#parallel).
>

In order to run parallel tests within your Jenkins CI Pipleine you will need to perform a few tasks in preparation:
* enable the `parallel` flag in the `saucectl` yaml file.
* intialize your tests to run in parallel.


