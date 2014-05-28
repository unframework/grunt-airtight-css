/*
 * Copyright (c) 2014 Nick Matantsev
 * Licensed under the BSD license.
 */

'use strict';

var fs = require('fs');
var airtightCssLint = require('airtight-css-lint');

module.exports = function (grunt) {
    grunt.registerMultiTask('airtightcss', 'Lint CSS for airtightness', function () {
        var hasErrors = false;

        this.filesSrc.forEach(function(file) {
            var css = fs.readFileSync(file, 'utf8');
            var ignoreErrors = /\/\*\s*grunt-airtightcss-ignore-file\s*\*\//.test(css);

            airtightCssLint(css, function (line, column, msg) {
                var logMessage = '[' + file + ':' + line + ':' + column + '] ' + msg;

                if (!ignoreErrors) {
                    grunt.log.error(logMessage);
                    hasErrors = true;
                } else {
                    grunt.log.writeln('IGNORED ' + logMessage);
                }
            });
        });

        if (hasErrors) {
            return false;
        }

        grunt.log.ok(this.filesSrc.length + ' files checked for airtightness.');
    });
};
