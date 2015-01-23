[![Build Status](https://travis-ci.org/NotMyself/jake-jshint.png)](https://travis-ci.org/NotMyself/jake-jshint)
# Jake-JsHint

Jake-JsHint provides a convenient front-end to [JSHint](http://www.jshint.com), a linter for Javascript. It should also work for [JSLint](http://www.jslint.com/). 

You're welcome to use the runner for your own projects. (See license below.) This project was just a quick hack, so I can't vouch for its robustness, but it should work in most cases. One flaw I'm aware of is that it assumes all files are UTF8-encoded, which may not be true for your system. It also has no exception handling.

The runner is a [Node.js](http://nodejs.org/) module. It exposes three functions:

      validateSource(sourceCode, [options], [globals], [description])
   
Run JSHint on raw source code and output the results to the console (using `console.log()`). If the code failed to validate, the details are also output to the console. If the code succeeded, a one-line `ok` message is displayed. If provided, `description` will be prepended to the pass/fail message, like this: `description ok`.

This function returns `true` if the code was valid or `false` if errors were found. `options` and `globals` are passed through to JSHint.

      validateFile(filename, [options], [globals])
   
Same as `validateSource`, except that the source code is read from a file.

      validateFileList(fileList, [options], [globals])
  
Validates multiple files and outputs the results for each one. All files are validated even when some fail.

`fileList` is expected to be an array. This function returns `true` if *all* files are valid and `false` otherwise.

## Installing with [NPM](http://npmjs.org/)

Install with:

    npm install jake-jshint

Or you may also install it as a development dependency in a package.json file:

    // package.json
    "devDependencies": {
      "jake-jshint": "latest"
    }

Then install it with `npm install`

## Running Tests

first:
     
     $ npm install -d
then:
     
     $ ./jake.sh

## Super simple to use

Jake JsHint is designed to be the simplest way to lint your project from a jake script.

```javascript
desc("Lint the code");
task("lint", [], function() {
  var files = new jake.FileList();
  files.include("lib/*.js");
  files.include("test/*.js");
  files.include("build/*.js");
  files.include("./*.js");
  files.exclude("node_modules");
  
  var options = {
    node: true
  };

  var globals = {
    describe: false
  };

  var pass = lint.run(files.toArray(), options, globals);
  if (!pass) fail("Lint failed");
});
```
For a full list of JsHint options check [here](http://www.jshint.com/docs/). 

Here is a suggested set:

```javascript
var options = {
    bitwise: true,
    curly: false,
    eqeqeq: true,
    forin: true,
    immed: true,
    latedef: true,
    newcap: true,
    noarg: true,
    noempty: true,
    nonew: true,
    regexp: true,
    undef: true,
    strict: true,
    trailing: true,
    node: true
  };

  var globals = {
    describe: false,
    it: false,
    beforeEach: false,
    afterEach: false
  };
```

License
-------
Copyright (c) 2012 James Shore

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
