# Integration UI Workflow & Styleguide
  
This document outlines the workflow for Web Integrators.

## Contents
1. [Requirements](#requirements)
2. [Clean Install of Dependencies](#setting-up-workflow)
3. [Workflow](#ui-workflow)
4. [Tests](#testing-code)
5. [Good practices](#good-practices)



<a name="requirements"></a>
## Requirements

You'll need to have the following items installed before getting started.

  * [Node.js](http://nodejs.org): Use the installer provided on the NodeJS website.
  * [Gulp](http://gulpjs.com/): Run `[sudo] npm install -g gulp`
  * [Yarn](https://classic.yarnpkg.com/fr/docs/install/): You can use Yarn instead of node. Run `brew install yarn` (mac)


<a name="setting-up-workflow"></a>
## Setting up Workflow

### Node Dependencies

* `npm cache clean && npm install`
* `npm install --global gulp-cli`



<a name="ui-workflow"></a>
## UI Workflow

While you're working on your project, run:

* `cd [...]/integration/src/` (...Or drag and drop the folder in your terminal for have the path automaticly)
* `gulp`

This will do several things for you automatically -
  * Connect SASS files use for Patterns and Components via `@import`
  * Generate CSS files -
    * Compile SASS files
    * Generate CSS SourceMaps
    * Auto-Prefix CSS so you don't need to worry about vendor prefixes
  * Generate js files
    * minify
    * sourceMaps
  * Generate html files -
    * Compile twig files
  * LiveReload of any edited HTML file using Chrome's LiveReload plugin
  * Creates static copy of files/assets for testing
  * Generated Minified JS and CSS to `/dist/assets`



<a name="testing-code"></a>
## Tools for testing code

* [Web developer](https://chrome.google.com/webstore/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm?hl=fr): Use for validate local HTML.
* [Wave](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh) : Use for test accessibility
* [IBM Equal Accessib](https://chrome.google.com/webstore/detail/ibm-equal-access-accessib/lkcagbfjnkomcinoddgooolagloogehp) : Use for test accessibility
* [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=fr) : Use for test performance

<a name="good-practices"></a>
## Good practices
* The project is in Bootstrap v5.0.0-beta1 so we have to create a minimum load by using as much as possible what is already present in Bootstrap [Bootstrap doc](https://getbootstrap.com/)
* The project is Atomic in design and code [BEM](http://getbem.com/introduction/)
* Make as many js examples as possible for devs (validation js/ push fake id in the modals / etc... )
* test your Validation html code
* test accessibility code to the maximum
