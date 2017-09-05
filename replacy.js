#!/usr/bin/env node
'use strict';

const program = require('commander');
var fs = require('fs');
var path = require('path');
var replace = require('replace');

program
    .version('0.1.0')
    .command('<expression> <replacement>')
    .parse(process.argv);

var replacement = ''
var exp = '';

var rename = function(dir, justFiles) {
    var flst = fs.readdirSync(dir);

    flst.forEach(file => {
        if (file.includes('.git') || file.includes('app.js')) return;

        var finalPath = path.join(dir, file);
        var nfile = file.replace(exp, replacement);
        var endPoint = path.join(dir, nfile);

        if (fs.statSync(finalPath).isDirectory()) {
            rename(finalPath, justFiles);
            if (!justFiles)
                if (file.includes(exp)) {
                    console.log(finalPath + " -> " + nfile);
                    fs.renameSync(finalPath, endPoint);
                }
        } else if (justFiles && file.includes(exp)) {
            console.log(finalPath + " -> " + nfile);
            fs.renameSync(finalPath, endPoint);
        }
    });
}

var replaceContent = function(path) {
    replace({
        regex: exp,
        replacement: replacement,
        paths: [path],
        recursive: true,
        silent: true,
    });
}

if (process.argv.length >= 4) {
    exp = process.argv[2];
    replacement = process.argv[3];
    var rootPath = process.cwd();

    console.log('Replacing ' + exp + ' with ' + replacement + '.');
    console.log('Using ' + rootPath + ' as root.');

    console.log('>> Directories <<');
    rename(rootPath, false);

    console.log('>> Files <<');
    rename(rootPath, true);
    console.log('>> Replacing inside files <<');
    replaceContent(rootPath);
} else {
    console.log('Must pass terms.');
    process.exit;
}

module.exports = {
    rename : rename,
    replaceContent : replaceContent
};