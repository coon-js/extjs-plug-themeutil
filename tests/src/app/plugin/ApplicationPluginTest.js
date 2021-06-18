/**
 * coon.js
 * extjs-plug-themeutil
 * Copyright (C) 2021 Thorsten Suckow-Homberg https://github.com/coon/extjs-plug-themeutil
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

StartTest((t) => {
    "use strict";

    t.requireOk(
        "coon.core.env.ext.VendorBase",
        "coon.core.ConfigManager",
        "coon.core.Environment",
        "coon.core.ThemeManager", () => {

            let plugin = null;

            const
                CLASS_NAME = "coon.plugin.themeutil.app.plugin.ApplicationPlugin",
                MOCK_CLASS_NAME = "coon.plugin.themeutil.tests.Theme";

            /**
             * creates mock for both theme and config if specified.,
             *
             * @param isCoonTheme
             * @param packageName
             * @param defaultConfig
             */
            const createMocks = (isCoonTheme, packageName = "", defaultConfig = {}) => {

                Ext.define(MOCK_CLASS_NAME, {
                    extend: "coon.core.Theme"

                }, function () {

                    if (!Ext.theme) {
                        Ext.theme = {is: {}};
                    }

                    Ext.theme.name = packageName;

                    if (!Ext.manifest.packages) {
                        Ext.manifest.packages = {};
                    }

                    if (!Ext.manifest.packages[packageName]) {
                        Ext.manifest.packages[packageName] = {};
                    }

                    const cn = MOCK_CLASS_NAME.split(".");
                    cn.pop();
                    Ext.manifest.packages[packageName].namespace = cn.join(".");

                    Ext.theme.is["coon-js-theme"] = isCoonTheme;

                    coon.core.ConfigManager.register(packageName, defaultConfig);
                });

            };


            // +-------------------------------------------------------
            // | Set up
            // +-------------------------------------------------------
            t.beforeEach(function () {
                plugin = Ext.create(CLASS_NAME);
                t.expect(Ext.ClassManager.isCreated("coon.plugin.themeutil.tests.Theme")).toBe(false);
                t.expect(coon.core.ThemeManager._theme).toBeFalsy();
                let vendorBase = new coon.core.env.ext.VendorBase();
                coon.core.Environment.setVendorBase(vendorBase);
            });


            // +-------------------------------------------------------
            // | Tear down
            // +-------------------------------------------------------
            t.afterEach(function () {
                coon.core.Environment._vendorBase = undefined;
                coon.core.ThemeManager._theme = undefined;
                Ext.theme = undefined;
                Ext.manifest.packages = undefined;
                Ext.undefine("coon.plugin.themeutil.tests.Theme");

                coon.core.ConfigManager.configs = {};

                if (!plugin) {
                    return;
                }

                plugin.destroy();

                plugin = null;
            });


            // +-------------------------------------------------------
            // | Tests
            // +-------------------------------------------------------

            t.it("constructor", function (t) {
                t.isInstanceOf(plugin, CLASS_NAME);
            });


            t.it("run() - Theme already set.", function (t) {

                coon.core.ThemeManager._theme = "someval";
                plugin.run();
                t.waitForMs(t.parent.TIMEOUT, function () {
                    t.expect(coon.core.ThemeManager.getTheme()).toBe("someval");
                });
            });


            t.it("run() - no coon.js-Theme", function (t) {

                createMocks(false, "mypack");
                plugin.run();

                t.waitForMs(t.parent.TIMEOUT, function () {
                    t.expect(coon.core.ThemeManager.getTheme()).toBeUndefined();
                });

            });


            t.it("run() - coon.js-Theme", function (t) {

                const config = {modes: {color: "blueish"}};

                createMocks(true,"theme-cn_mock", config);

                const spy = t.spyOn(Ext, "create");
                plugin.run();
                t.expect(spy.calls.mostRecent().args[0]).toBe(MOCK_CLASS_NAME);
                t.isInstanceOf(coon.core.ThemeManager.getTheme(), MOCK_CLASS_NAME);
                t.expect(coon.core.ConfigManager.get("theme-cn_mock")).toBe(config);
                t.expect(spy.calls.mostRecent().args[1]).toBe(config);
            });
   
        });
});
