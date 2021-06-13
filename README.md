# @coon-js/extjs-plug-themeutil  
[ApplicationPlugin](https://github.com/coon-js/extjs-lib-core/blob/master/src/app/plugin/ApplicationPlugin.js) for querying and 
applying a configured [coon.core.Theme](https://github.com/coon-js/extjs-lib-core/blob/master/src/Theme.js) for a [coon.js](https://github.com/coon-js) application.

## Overview
The plugin serves different purposes:

 * Query the environment for the used theme and do the following if, and only if the theme is an instance of [coon.core.Theme](https://github.com/coon-js/extjs-lib-core/blob/master/src/Theme.js):
    * Read out any available package configuration for the theme
    * Apply the configuration to the theme and register it with the [coon.core.ThemeManager](https://github.com/coon-js/extjs-lib-core/blob/master/src/ThemeManager.js)
    * Apply the default mode for the theme
    
## Installation
```
npm install --save-dev @coon-js/extjs-lib-core
```

## Post-Install
[@coon-js/extjs-link](https://npmjs.org/coon-js/extjs-link) will start once the package was installed and guide you
through the process of creating symlinks to an existing ExtJS sdk installation.
This is only required if you want to run the tests (`./tests`), as [Siesta](https//npmjs.org/siesta-lite) relies on
an existing ExtJS installation.

## Usage
### Requirements
* This package requires the [extjs-lib-core](https://github.com/coon-js/extjs-lib-core) package of the [coon.js](https://github.com/coon-js) project.

### Theme Naming Conventions
Any theme that inherits from ```coon.core.Theme``` that should be considered with this plugin must obey to the following
conventions:

* The theme must be registered with
    * ```coon.core.Environment.get("coon-js-theme") = true```
    * ```coon.core.Environment.get("theme.name") = "name_of_the_theme_package"```, e.g. if the
      package's name is ```theme-acme```, this setting must equal to ```theme-acme```

  These settings are usually configured in a file called ```init.js```, placed in the ```overrides```-folder
  of the theme-package.
* The theme's class-name must be build as follows: ```package_namespace.Theme```, e.g. if the
  package's namespace is ```acme.theme.colorTheme```, the fqn of the theme-class extending ```coon.core.Theme```
  must be ```acme.theme.colorTheme.Theme```

### Configuring a PackageController
You are free to use this plugin in any [PackageController](https://github.com/coon-js/v/blob/master/src/app/PackageController.js) you'd like to chose.

### Example implementation
For an example implementation of a [coon.core.Theme](https://github.com/coon-js/extjs-lib-core/blob/master/src/Theme.js) used with this plugin,
have a look at the [conjoon.theme.material.Theme](https://github.com/conjoon/theme-cn_material/blob/master/src/Theme.js) of the [conjoon](https://github.com/conjoon)\-project.


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


