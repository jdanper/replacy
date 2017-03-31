# replacy
Replace one term with another in a directory, including file names and their contents.

## Installation

$ npm install -g replacy

## Usage
  
$ replacy -exp- -replacement- <br>
where: <br>
  -exp- is the expression to be replaced<br>
  -replacement- is the new value
         
## Important
  The action is made recursively, the only exception is .git directory. All the rest will be changed (according with the search expression).
