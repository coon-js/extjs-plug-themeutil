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

var harness = new Siesta.Harness.Browser.ExtJS();

harness.configure({
    title          : "plug-cn_themeutil",
    disableCaching : true,
    loaderPath     : {

        "coon.plugin.themeutil" : "../src",


        /**
         * Requirements
         */
        "coon.core" : "../../lib-cn_core/src",

        "Ext.Package" : "../../../remote/package-loader/src/Package.js",
        "Ext.package" : "../../../remote/package-loader/src/package"


    },
    preload        : [
        coon.tests.config.paths.extjs.css.url,
        coon.tests.config.paths.extjs.js.url
    ]
});

harness.start({
    group : "universal",
    items : [{
        group : "coon",
        items : [{
            group : "plugin",
            items : [{
                group : "themeutil",
                items : [{
                    group : "app",
                    items : [{
                        group : "plugin",
                        items : [
                            "./src/app/plugin/ApplicationPluginTest.js"
                        ]
                    }]
                }]
            }]
        }]
    }]
});
