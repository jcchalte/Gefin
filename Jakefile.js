/// <reference path="Scripts/GlobalReferences.d.ts"/>
var fs = require("fs");

task("default", ["Typescript", "test", "node"], function () {
});

// ReSharper disable InconsistentNaming
var GENERATED_DIR = "generated";
var TEMP_TESTFILE_DIR = GENERATED_DIR + "/test";

// ReSharper restore InconsistentNaming
directory(TEMP_TESTFILE_DIR);

task("Typescript", ["TypescriptArgumentFile"], function () {
    console.log("compilation Typescript...");

    var command = "tsc --module commonJS @tscFiles.txt";
    var stdout = "";
    var stderr = "";
    var childProcess = jake.createExec(command, { printStdout: true, printStderr: true });

    childProcess.on("stdout", function (chunk) {
        stdout += chunk;
    });
    childProcess.on("stderr", function (chunk) {
        stderr += chunk;
    });
    childProcess.on("error", function (chunk) {
        console.log("error ! " + chunk);
    });
    childProcess.on("cmdEnd", function () {
        if (stderr)
            fail("Erreur TSC : " + stderr);
        else {
            console.log("OK !");
            console.log();
            complete();
        }
    });
    childProcess.run();
}, { async: true });

task("TypescriptArgumentFile", [], function () {
    var tsFileList = new jake.FileList();
    tsFileList.include("**/*.ts");
    tsFileList.exclude("node_modules");
    var tsFiles = tsFileList.toArray().join(" ");
    fs.writeFileSync("tscFiles.txt", tsFiles);
});

task("beforeTest", [TEMP_TESTFILE_DIR]);

task("clean", [], function () {
    jake.rmRf(GENERATED_DIR);
});

var testsFileList = new jake.FileList();
testsFileList.include("**/_*_test.ts");
testsFileList.exclude("node_modules");
var mocha = require('jake-mocha');
mocha.defineTask({
    name: 'test',
    files: ['src/server/**/_*_test.js', 'src/_*_test.js'],
    mochaOptions: {
        ui: 'bdd',
        reporter: 'nyan'
    },
    prerequisites: ["beforeTest", "Typescript", "node"]
});

task("node", function () {
    console.log("detection de Node.js...");
    var desiredNodeVersion = "v0.10.25";

    var command = "node --version";
    var stdout = "";
    var process = jake.createExec(command, { printStdout: true, printStderr: true });
    process.on("stdout", function (chunk) {
        stdout += chunk;
    });
    process.on("cmdEnd", function () {
        if (stdout.indexOf(desiredNodeVersion) !== 0) {
            fail("Incorrect node version. Expected " + desiredNodeVersion + ", found " + stdout);
        }
        console.log("OK!");
        console.log();
        console.log();
        complete();
    });
    process.run();
}, { async: true });
