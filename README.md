# replacy
Replace one term with another in a directory, including file names and their contents.

## Installation

### CLI version
$ npm install replacy -g
### For development
$ npm install replacy -s

## Usage
### CLI
$ replacy {oldExp} {newExp} <br>
where: <br>
  {oldExp} is the expression to be replaced<br>
  {newExp} is the replacement

$ replacy oldFoo newBar

### For development
Functions: <br>
  rename(path, justFiles, oldExp, newExp) -> renames all files [and folders if justFiles=false]. Doesn't touches its contents.<br>
  replaceContent(path, oldExp, newExp) -> replaces oldExp with newExp inside all files. Doesn't changes file names.<br>
  renameAndReplace(path, oldExp, newExp) -> run all together. Uses 'justFiles' = true to rename <br>

Params: <br>
  -- justFiles: bool -> true=rename only files; false=include folders <br>
  -- path: string -> working dir <br>
  -- oldExp: string -> expression to be replaced <br> 
  -- newExp: string -> replacement <br>

Using: <br>
var replacy = require('replacy')<br>
replacy.rename('/someDir', true||false, 'oldFoo', 'newBar') <br>
replacy.replaceContent('/someDir', 'oldFoo', 'newBar') <br>
replacy.renameAndReplace('/someDir', 'oldFoo', 'newBar')<br>

## Important
  The action is made recursively, the only exception is .git directory. All the rest will be changed (according with the search expression).
