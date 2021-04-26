# plug-cn_themeutil  
[ControllerPlugin](https://github.com/coon-js/lib-cn_core/blob/master/src/app/PluginController.js) for querying and 
applying a configured [coon.core.Theme](https://github.com/coon-js/lib-cn_core) for a [coon.js](https://github.com/coon-js) application.

## Overview
The plugin serves different purposes:

 * Query the environment for the used theme and do the following if, and only if the theme is an instance of [coon.core.Theme](https://github.com/coon-js/lib-cn_core/blob/master/src/Theme.js):
    * Read out any available package configuration for the theme
    * Apply the configuration to the theme and register it with the [coon.core.ThemeManager](https://github.com/coon-js/lib-cn_core/blob/master/src/ThemeManager.js)
    * Apply the default mode for the theme

## Naming
The following naming conventions apply:

#### Namespace
`coon.plugin.cn_themeutil.*`
#### Package name
`plug-cn_themeutil`
#### Shorthand to be used with providing aliases
`cn_themeutil`

## Usage
### Requirements
 * This package requires the [lib-cn_core](https://github.com/coon-js/lib-cn_core) package of the [coon.js](https://github.com/coon-js) project.

### Theme Naming Conventions
Any theme that inherits from ```coon.core.Theme``` that should be considered with this plugin must obey to the following
conventions:

  * The theme must be registered with 
    * ```Ext.theme.is["coon-js-theme"] = true```
    * ```Ext.theme.name = "name_of_the_theme_package"```, e.g. if the
     package's namespace is ```theme-acme```, this setting would be ```Ext.theme.name = "theme-acme"```
    
    These settings are usually configured in a file called ```init.js```, placed in the ```overrides```-folder
    of the theme-package.
 * The theme's class-name must be build as follows: ```package_namespace.Theme```, e.g. if the
   package's namespace is ```acme.theme.colorTheme```, the fqn of the theme-class extending ```coon.core.Theme```
   must be ```acme.theme.colorTheme.Theme```

### Configuring a PackageController
You are free to use this plugin in any [PackageController](https://github.com/coon-js/lib-cn_core/blob/master/src/app/PackageController.js) you'd like to chose.

### Example implementation
For an example implementation of a [coon.core.Theme](https://github.com/coon-js/lib-cn_core/blob/master/src/Theme.js) used with this plugin,
have a look at the [conjoon.theme.material.Theme](https://github.com/conjoon/theme-cn_material/blob/master/src/Theme.js) of the [conjoon](https://github.com/conjoon)\-project.

## Tests
Tests are written with [Siesta](https://bryntum.com/siesta)


