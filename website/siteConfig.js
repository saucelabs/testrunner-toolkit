/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'Sauce Labs',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/image.jpg'.
    image: '/img/sauce-badge.png',
    infoLink: 'https://saucelabs.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'Testrunner Toolkit Documentation', // Title for your website.
  url: 'https://saucelabs.github.io', // Your website URL
  baseUrl: '/testrunner-toolkit/', // Base URL for your project */
  projectName: 'testrunner-toolkit',
  organizationName: 'saucelabs',
  disableHeaderTitle: true,

  //gaGtag: true,
  gaTrackingId: 'UA-6735579-1',

  // Used for search
  // algolia: {
  //   apiKey: 'my-api-key',
  //   indexName: 'my-index-name',
  //   algoliaOptions: {} // Optional, if provided by Algolia
  // },

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    //{doc: "overview", label: 'Docs'},
    //{blog: true, label: 'Blog'},
    {href: "https://saucelabs.com/sign-up", label: "Try Sauce Labs", external: true },
    {href: "https://app.saucelabs.com/", label: "Sign in", external: true },
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/logo-saucelabs.png',
  footerIcon: 'img/favicon.ico',
  favicon: 'img/favicon.png',

  /* Colors for website */
  colors: {
    primaryColor: "#E12219",
    secondaryColor: "#4a282c",
    textColor: "#464b54"
  },

  /* Custom fonts for website */
  fonts: {
    saucelabsFont: [
      "museo-sans",
      "HelveticaNeue",
      "Helvetica Neue",
      "Serif"
    ]
  },

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © 2020-${new Date().getFullYear()} Sauce Labs`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
      'https://buttons.github.io/buttons.js',
      'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
      '/js/code-block-buttons.js',
    ],
  stylesheets: [
      'https://use.typekit.net/zmt8tam.css',
      '/css/code-block-buttons.css',
    ],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;