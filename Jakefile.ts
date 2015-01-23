/// <reference path="Scripts/GlobalReferences.d.ts"/>
import fs = require("fs");

task("default", ["Typescript","test", "node"], () => {
});

// ReSharper disable InconsistentNaming
var GENERATED_DIR = "generated";
var TEMP_TESTFILE_DIR = GENERATED_DIR+"/test";
// ReSharper restore InconsistentNaming

directory(TEMP_TESTFILE_DIR);

task("Typescript", ["TypescriptArgumentFile"], () => {
    console.log("compilation Typescript...");

    var command = "tsc --module commonJS @tscFiles.txt";
    var stdout = "";
    var stderr = "";
    var childProcess = jake.createExec(command, { printStdout: true, printStderr: true });
    
    childProcess.on("stdout", (chunk) => {
        stdout += chunk;
    });
    childProcess.on("stderr", (chunk) => {
        stderr += chunk;
    });
    childProcess.on("error", (chunk) => {
        console.log("error ! "+chunk);
    });
    childProcess.on("cmdEnd", () => {
        if (stderr)
            fail("Erreur TSC : " + stderr);
        else {
            console.log("OK !");
            console.log();
            complete();
        }
    });
    childProcess.run();
}, {async:true});

task("TypescriptArgumentFile", [], () => {
    var tsFileList = new jake.FileList();
    tsFileList.include("**/*.ts");
    tsFileList.exclude("node_modules");
    var tsFiles = tsFileList.toArray().join(" ");
    fs.writeFileSync("tscFiles.txt", tsFiles);
});


task("beforeTest", [TEMP_TESTFILE_DIR]);

task("clean", [], () => {
    jake.rmRf(GENERATED_DIR);
});

var mocha = require('jake-mocha');
mocha.defineTask(
    {
        name: 'test',
        files: '**/_*_test.js',
        mochaOptions: {
            ui: 'bdd',
            reporter: 'nyan'
        },
        prerequisites: ["beforeTest", "Typescript", "node"]
    });


task("node", () => {
    console.log("detection de Node.js...");
    var desiredNodeVersion = "v0.10.25";

    var command = "node --version";
    var stdout = "";
    var process = jake.createExec(command, { printStdout: true, printStderr: true });
    process.on("stdout", (chunk) => {
        stdout += chunk;
        
    });
    process.on("cmdEnd", () => {
        if (stdout.indexOf(desiredNodeVersion) !== 0) {
            fail("Incorrect node version. Expected " + desiredNodeVersion + ", found " + stdout);
        }
        console.log("OK!");
        console.log();
        complete();
    });
    process.run();

});

