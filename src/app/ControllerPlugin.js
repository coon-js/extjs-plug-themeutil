/**
 * coon.js
 * plug-cn_themeutil
 * Copyright (C) 2021 Thorsten Suckow-Homberg https://github.com/coon/plug-cn_themeutil
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * ControllerPlugin for registering q {coon.core.Theme} with the {coon.core.ThemeManager}
 * to make it generally available to an application.
 * Reads out configuration from the {coon.core.ConfigManager} for the theme's package and
 * applies its "modes"-value (if config available) to the theme.
 * 
 * Any theme that inherits from coon.core.Theme that should be considered with this plugin must obey to the following
 * conventions:
 * - The theme must be registered with
 *    Ext.theme.is["coon-js-theme"] = true
 *    Ext.theme.name = "name_of_the_theme_package", e.g. if the
 *    package's namespace is "theme-acme", this setting would be "Ext.theme.name = 'theme-acme'"
 *    These settings are usually configured in a file called init.js, placed in the overrides-folder
 *    of the theme-package.
 * - The theme's class-name must be build as follows: "package_namespace.Theme", e.g. if the
 *   package's namespace is "acme.theme.colorTheme", the fqn of the theme-class extending {coon.core.Theme}
 *   must be "acme.theme.colorTheme.Theme"
 *
 */
Ext.define("coon.plugin.themeutil.app.ControllerPlugin", {

    extend : "coon.core.app.ControllerPlugin",

    requires : [
        "coon.core.ThemeManager",
        "coon.core.ConfigManager"
    ],


    /**
     * If the theme available as Ext.theme.name is a coon.js-Theme, this method
     * will create an instance of it, apply any found configuration in {coon.core.ConfigManager}
     * for the package-name (queries then for a "modes"-property for teh configuration of the theme)
     * and register it with the ThemeManager.
     *
     * @param {coon.core.app.PackageController} packagerController
     */
    run : function (controller) {

        if (coon.core.ThemeManager.getTheme()) {
            return;
        }

        if (!Ext.theme || !Ext.theme.is["coon-js-theme"]) {
            return;
        }

        const
            themeName = Ext.theme.name,
            fqn = Ext.manifest.packages[themeName].namespace + ".Theme",
            config = coon.core.ConfigManager.get(themeName) || {},
            theme = Ext.create(fqn, config.modes);

        coon.core.ThemeManager.setTheme(theme);
    }


});