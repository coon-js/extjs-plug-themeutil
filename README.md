# @coon-js/extjs-plug-themeutil ![MIT](https://img.shields.io/npm/l/@coon-js/extjs-plug-themeutil) [![npm version](https://badge.fury.io/js/@coon-js%2Fextjs-plug-themeutil.svg)](https://badge.fury.io/js/@coon-js%2Fextjs-plug-themeutil)
[ApplicationPlugin](https://github.com/coon-js/extjs-lib-core/blob/master/src/app/plugin/ApplicationPlugin.js) for querying and 
applying a configured [coon.core.Theme](https://github.com/coon-js/extjs-lib-core/blob/master/src/Theme.js) for a [coon.js](https://github.com/coon-js) application.

## Overview
The plugin serves different purposes:

 * Query the environment for the used theme and do the following if, and only if the theme is an instance of [coon.core.Theme](https://github.com/coon-js/extjs-lib-core/blob/master/src/Theme.js):
    * Read out any available package configuration for the theme
    * Apply the configuration to the theme and register it with the [coon.core.ThemeManager](https://github.com/coon-js/extjs-lib-core/blob/master/src/ThemeManager.js)
    * Apply the default mode for the theme
    
## Installation
```bash
$ npm install --save-dev @coon-js/extjs-plug-themeutil  
```
Use
```bash
$ npm run build:dev
```
for creating the dev environment.

For using the package as an external dependency in an application, use
```bash
$ npm install --save-prod @coon-js/extjs-plug-themeutil  
```
In your `app.json`, add this package as a requirement, and make sure your ExtJS `workspace.json`
is properly configured to look up local repositories in the `node_modules`-directory.

Example (`workspace.json`) :
```json 
{
  "packages": {
    "dir": "${workspace.dir}/node_modules/@l8js,${workspace.dir}/node_modules/@conjoon,${workspace.dir}/node_modules/@coon-js,${workspace.dir}/packages/local,${workspace.dir}/packages,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name},${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-treegrid,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-base,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-ios,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-material,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-aria,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-neutral,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-classic,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-gray,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-crisp,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-crisp-touch,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-neptune,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-neptune-touch,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-triton,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-graphite,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-material,${workspace.dir}/node_modules/@sencha/ext-calendar,${workspace.dir}/node_modules/@sencha/ext-charts,${workspace.dir}/node_modules/@sencha/ext-d3,${workspace.dir}/node_modules/@sencha/ext-exporter,${workspace.dir}/node_modules/@sencha/ext-pivot,${workspace.dir}/node_modules/@sencha/ext-pivot-d3,${workspace.dir}/node_modules/@sencha/ext-ux,${workspace.dir}/node_modules/@sencha/ext-font-ios",
    "extract": "${workspace.dir}/packages/remote"
  }
}
```

## Post-Install
[@coon-js/extjs-link](https://npmjs.org/coon-js/extjs-link) will start once the package was installed and guide you
through the process of creating symlinks to an existing ExtJS sdk installation.
This is only required if you want to run the tests (`./tests`), as [Siesta](https//npmjs.org/siesta-lite) relies on
an existing ExtJS installation.

## Usage

### Theme Naming Conventions
Any theme that inherits from `coon.core.Theme` that should be considered with this plugin must obey to the following
conventions:

* The theme must be registered, so that querying the environment via
    * `coon.core.Environment.get("coon-js-theme")` equals `true`
    * `coon.core.Environment.get("theme.name")` equals to `name_of_the_theme_package`, e.g. if the
      package's name is `theme-acme`, this setting must equal to `theme-acme`

  These settings are usually configured in a file called `init.js`, placed in the `overrides`-folder
  of the theme-package.
* The theme's class-name must be build as follows: `package_namespace.Theme`, e.g. if the
  package's namespace is `acme.theme.colorTheme`, the fqn of the theme-class extending `coon.core.Theme`
  must be `acme.theme.colorTheme.Theme`

### Configuring a PackageController
You are free to use this plugin in any [PackageController](https://github.com/coon-js/v/blob/master/src/app/PackageController.js) you'd like to chose.

### Example implementation
For an example implementation of a [coon.core.Theme](https://github.com/coon-js/extjs-lib-core/blob/master/src/Theme.js) used with this plugin,
have a look at the [conjoon.theme.material.Theme](https://github.com/conjoon/theme-cn_material/blob/master/src/Theme.js) of the [conjoon-project](https://github.com/conjoon).


## Dev
### Naming
The following naming conventions apply:

#### Namespace
`coon.plugin.themeutil.*`
#### Package name
`extjs-plug-themeutil`
#### Shorthand to be used with providing aliases
`cn_themeutil`

## Tests
Tests are written with [Siesta](https://bryntum.com/siesta)


