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

var rename = function (dir, justFiles, oldExp, newExp) {
    var flst = fs.readdirSync(dir);

    flst.forEach(file => {
        if (file.includes('.git') || file.includes('app.js')) return;

        var finalPath = path.join(dir, file);
        var nfile = file.replace(oldExp, newExp);
        var endPoint = path.join(dir, nfile);

        if (fs.statSync(finalPath).isDirectory()) {
            rename(finalPath, justFiles);
            if (!justFiles)
                if (file.includes(oldExp)) {
                    console.log(finalPath + " -> " + nfile);
                    fs.renameSync(finalPath, endPoint);
                }
        } else if (justFiles && file.includes(oldExp)) {
            console.log(finalPath + " -> " + nfile);
            fs.renameSync(finalPath, endPoint);
        }
    });
}

var replaceContent = function (path, oldExp, newExp) {
    replace({
        regex: oldExp,
        replacement: newExp,
        paths: [path],
        recursive: true,
        silent: true,
    });
}

var renameAndReplace = function (path, oldExp, newExp) {
    var rootPath = process.cwd();
    console.log('Replacing ' + oldExp + ' with ' + newExp + '.');
    console.log('Using ' + rootPath + ' as root.');

    console.log('>> Directories <<');
    rename(rootPath, false, oldExp, newExp);

    console.log('>> Files <<');
    rename(rootPath, true, oldExp, newExp);
    console.log('>> Replacing inside files <<');
    replaceContent(rootPath, oldExp, newExp);
}

if (process.argv.length >= 4) {
    renameAndReplace(process.cwd(), process.argv[2], process.argv[3]);
} else {
    console.log('Must pass terms.');
    process.exit;
}

module.exports = {
    rename: rename,
    replaceContent: replaceContent,
    renameAndReplace:renameAndReplace
};