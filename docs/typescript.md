---
id: typscript
title: Using TypeScript Tests
sidebar_label: TypeScript
---

If you built your automated tests using TypeScript in either Playwright, Puppeteer, TestCafe, or Cypress, you need the following workaround in order to use Testrunner Toolkit.

## What You'll Need
1. [A Sauce Labs Account](https://saucelabs.com/sign-up)
2. [TypeScript](https://www.typescriptlang.org/download)

## The Problem

Assuming your `tests` directory setup is similar to the structure below:

__Example Project Setup__

```bash
.
└── tests/
    ├── test.one.spec.ts
    ├── test.two.spec.ts
    ├── test.three.spec.ts
    └── tsconfig.json
```

Except for the TestCafe image, these `.ts` files cannot run directly on any Testrunner Toolkit images. Therefore in order to make theses test run correclty you must transpile them JavaScript.

## The Solution

1. Ensure you already have `typescript` installed:
    
   ```js
   npm install -g typescript
   ```

2. Review your `tsconfig.json` to ensure you've set the `compilerOptions` appropriately.

    > For more information on how to properly configure `tsconfig.json` please visit the [documentation](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html#writing-a-configuration-file).
 
3. Run the TypeScript compiler like so:
   
   ```ts
   npx tsc --project ./tests/tsconfig.json
   ```
   
   Again, the way the TypeScript compiles your `.ts` files are non-deterministic and depend on how you've configurated `tsconfig.json`, but an example output could look like this:
   
   ```js
   └── tests/
       ├── test.one.spec.ts
       ├── test.one.spec.js
       ├── test.two.spec.ts
       ├── test.two.spec.js
       ├── test.three.spec.ts
       ├── test.three.spec.js
       └── tsconfig.json
   ```
4. Next, edit the `files` and `suites` fields in `.sauce/config.yml` in order to ignore the `.ts` files and instead place the `.js` files inside the Testrunner Toolkit container:
    
   ```yaml
   files:
     - tests/
   suites:
     - name: "basic test"
       match: ".*.(spec|test).js"
   ```
   
   > By default `saucectl` will pickup any `.js` files located in the designated directory, however with the `suites` field you can set more granular control with regular expressions.

5. Finally, run `saucectl` to execute your TypeScript tests:
   
   ```bash
   saucectl run -c .sauce/config.yml
   ```
   
    > For further information, please refer to the working example of this TypeScript demonstration in the [Sauce Labs Puppeteer Runner](https://github.com/saucelabs/sauce-puppeteer-runner/tree/master/tests/fixtures/typescript) repository.

---