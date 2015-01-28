/// <reference path="Scripts/GlobalReferences.d.ts"/>
import fs = require("fs");
import cliColor = require("cli-color");

desc("Default task for everything");
task("default", ["Typescript", "testServerCode", "testClient", "node"], () => {
    console.log(cliColor.green("\n\nOK !"));
});


module Configurations {
    export module Node {
        export var desiredVersion = "v0.10.";
    }

    export module Typescript {
        export var desiredVersion = "1.4.0.0";
    }


    export module TempDirectories {
        export var generatedDir = "generated";
        export var tempTestfileDir = generatedDir + "/test";
    }


    export module Karma {
        export var runnerOptions = {
            basePath: '.',
            // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
            frameworks: ['mocha', 'requirejs'],
            // list of files / patterns to load in the browser
            files: [
                { pattern: 'node_modules/expect.js/index.js', included: true },
                { pattern: 'Scripts/array.generics.js', included: true },
                { pattern: 'test-main.js', included: true },
                { pattern: 'src/client/_*_test.js', included: false },
                { pattern: 'src/client/*.js', included: false }
            ],
            // list of files to exclude
            exclude: [
            ],
            // preprocess matching files before serving them to the browser
            preprocessors: {

            },
            reporters: ['progress'],
            // web server port
            port: 9876,
            // enable / disable colors in the output (reporters and logs)
            colors: true,
            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: false,
            browsers: [],
            singleRun: false
        };

        export var supportedBrowsers = [
            {
                name: "IE8.0",
                karmaOutputRegex: /IE 8\.0.*: Executed/
            },
            {
                name: "IE9.0",
                karmaOutputRegex: /IE 9\.0.*: Executed/
            },
            {
                name: "IE10.0",
                karmaOutputRegex: /IE 10\.0.*: Executed/
            },
            {
                name: "IE11.0",
                karmaOutputRegex: /IE 11\.0.*: Executed/
            },
            {
                name: "Firefox",
                karmaOutputRegex: /Firefox .*: Executed/
            },
            {
                name: "Chrome",
                karmaOutputRegex: /Chrome .*: Executed/
            }
        ];
    }

}

module TypescriptTasks {

    desc("All Typescript compilations");
    task("Typescript", ["TypescriptClient", "TypescriptServer"]);

    desc("Typescript Client files compilation");
    task("TypescriptClient", ["TypescriptClientArgumentFile", "TypescriptVersion"], () => {
        console.log("Typescript client compilation...");
        Helpers.executeCommand("tsc --module AMD @tscClientFiles.txt", true, complete, fail);
    }, { async: true });

    desc("@tscClientFiles.txt file creation");
    task("TypescriptClientArgumentFile", [], () => {
        Helpers.writeFileNamesToFile("tscClientFiles.txt", ["src/client/**/*.ts"], ["node_modules"]);
    });

    desc("Typescript Server files compilation");
    task("TypescriptServer", ["TypescriptServerArgumentFile","TypescriptVersion"], () => {
        console.log("Typescript server compilation...");
        Helpers.executeCommand("tsc --module commonJS @tscServerFiles.txt", true, complete, fail);
    }, { async: true });

    desc("@tscServerFiles.txt creation");
    task("TypescriptServerArgumentFile", [], () => {
        Helpers.writeFileNamesToFile("tscServerFiles.txt", ["**/*.ts"], ["src/client", "node_modules", "packages"]);
    });

    desc("Typescript Version verification");
    task("TypescriptVersion", [], () => {
        console.log("Typescript version verification...");
        Helpers.executeCommand("tsc -v", true,(out, err) => {
            if (out.indexOf(Configurations.Typescript.desiredVersion) !== -1)
                complete();
            else fail("Typescript " + Configurations.Typescript.desiredVersion+" is required");
        }, fail);
    }, { async: true });
}

module CleanTasks {
    import GeneratedDir = Configurations.TempDirectories.generatedDir;
    desc("Temporary files cleanup");
    task("clean", [], () => {
        jake.rmRf(GeneratedDir);
    });
}

module TestTasks {
    import TempTestfileDir = Configurations.TempDirectories.tempTestfileDir;
    desc("Test everything");
    task('test', ["testServerCode", "testClient"]);

    directory(TempTestfileDir);
    task("beforeTest", [TempTestfileDir, "node"], () => {
        console.log("Mocha server test");
    });

    var testsFileList = new jake.FileList();
    testsFileList.include("**/_*_test.js");
    testsFileList.exclude("node_modules");
    testsFileList.exclude("src/client");

    var mocha = require('jake-mocha');

    mocha.defineTask(
        {
            name: 'testServerBody',
            description: 'server testing',
            files: testsFileList.toArray(),
            mochaOptions: {
                ui: 'bdd',
                reporter: 'Spec'
            },
            prerequisites: ["beforeTest", "Typescript"]
        });

    task("testServerCode", ["testServerBody"],() => {
        console.log("OK !");
        console.log();
    });

    desc("client testing");
    task("testClient", ["Typescript"], () => {
        var karmaConfJSExpectedContent = "module.exports = function(config) {config.set(" + JSON.stringify(Configurations.Karma.runnerOptions) + ");};";

        var currentkarmaConfJSContent = fs.readFileSync("karma.conf.js", "utf8");
        if (currentkarmaConfJSContent !== karmaConfJSExpectedContent) {
            fs.writeFileSync("karma.conf.js", karmaConfJSExpectedContent);
            fail("karma.conf.js" + " content was changed. Server probably needs reset. Reset the server then start jake again.");
        } else {
            var runner = require('karma').runner;

            var oldStdOutputWrite = process.stdout.write;
            var karmaOutput = "";
            process.stdout.write = <{ (buffer: Buffer, cb?: Function): boolean; (str: string, cb?: Function): boolean; (str: string, encoding?: string, cb?: Function): boolean }>function (buffer) {
                karmaOutput += buffer;
                oldStdOutputWrite.apply(this, arguments);
            };

            runner.run(Configurations.Karma.runnerOptions, (exitCode) => {
                if (exitCode)
                    fail("Karma has exited with exit code " + exitCode);
                else {
                    KarmaHelpers.assertAllBrowsersAreTested(karmaOutput);
                    complete();
                }
            });
        }
    }, { async: true });

    module KarmaHelpers {
        export function assertAllBrowsersAreTested(karmaOutput: string) {
            var untestedBrowsers = [];

            Configurations.Karma.supportedBrowsers.forEach((browser) => {
                var passed = browser.karmaOutputRegex.test(karmaOutput);

                if (!passed) {
                    untestedBrowsers.push(browser.name);
                }
            });

            if (untestedBrowsers.length > 0 && !process.env['loose']) {
                console.log(untestedBrowsers.join(", ") + " are not tested (Use 'loose=true' to skip that test)");
                fail();
            }
        }
    }

}

module Utility {
    task("node", () => {
        console.log("Node.js detection...");

        Helpers.executeCommand("node --version", false, (stdout: string) => {
            if (stdout.indexOf(Configurations.Node.desiredVersion) !== 0) {
                fail("Incorrect node version. Expected " + Configurations.Node.desiredVersion + ", found " + stdout);
            } else complete();
        }, fail);
    }, { async: true });

}

module Helpers {
    export function executeCommand(command: string, pipeOutputs: boolean, complete: (stdout: string, stderr: string) => void, fail: (stdout: string, stderr: string) => void) {
        var stdout = "";
        var stderr = "";
        var childProcess = jake.createExec(command, { printStdout: true, printStderr: true });
        childProcess.on("stdout", (chunk) => {
            if (pipeOutputs)
                process.stdout.write(chunk);
            stdout += chunk;
        });
        childProcess.on("stderr", (chunk) => {
            if (pipeOutputs)
                process.stderr.write(chunk);
            stderr += chunk;
        });
        childProcess.on("error", (chunk) => {
            process.stderr.write(chunk);
            fail(stdout, stderr);
        });
        childProcess.on("cmdEnd", () => {
            complete(stdout, stderr);
        });
        childProcess.run();
    }


    export function writeFileNamesToFile(fileName: string, includes: string[], excludes?: string[]) {
        var fileList = new jake.FileList();
        if (includes != null)
            includes.forEach((include) => {
                fileList.include(include);
            });
        if (excludes != null)
            excludes.forEach((exclude) => {
                fileList.exclude(exclude);
            });

        var fileContent = fileList.toArray().join(" ");
        fs.writeFileSync(fileName, fileContent);
    }

}