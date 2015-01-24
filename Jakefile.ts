/// <reference path="Scripts/GlobalReferences.d.ts"/>
import fs = require("fs");

desc("Default task for everything");
task("default", ["Typescript", "testServerCode", "testClient", "node"], () => {
});


module Configurations {
    export module Node {
        export var desiredVersion = "v0.10.25";
    }

    export module TempDirectories {
        export var generatedDir = "generated";
        export var tempTestfileDir = generatedDir + "/test";
    }


    export module Karma {
        export var runnerOptions = {
            basePath: '.',
            frameworks: ['mocha', 'requirejs'],
            files: [
                'node_modules/expect.js/index.js',
                'src/client/_*_test.js'
            ],
            exclude: [
            ],
            preprocessors: {
            },
            reporters: ['dot'],
            port: 9876,
            colors: true,
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
    desc("Compilation des tous les typescript");
    task("Typescript", ["TypescriptClient", "TypescriptServer"]);

    desc("Compilation des typescript client");
    task("TypescriptClient", ["TypescriptClientArgumentFile"], () => {
        console.log("compilation Typescript client...");
        Helpers.executeCommand("tsc --module AMD @tscClientFiles.txt", true, complete, fail);
    }, { async: true });

    desc("Création @tscClientFiles");
    task("TypescriptClientArgumentFile", [], () => {
        Helpers.writeFileNamesToFile("tscClientFiles.txt", ["src/client/**/*.ts"], ["node_modules"]);
    });

    desc("Compilation des typescript server");
    task("TypescriptServer", ["TypescriptServerArgumentFile"], () => {
        console.log("compilation Typescript serveur...");
        Helpers.executeCommand("tsc --module commonJS @tscServerFiles.txt", true, complete, fail);
    }, { async: true });

    desc("Création @tscServerFiles");
    task("TypescriptServerArgumentFile", [], () => {
        Helpers.writeFileNamesToFile("tscServerFiles", ["**/*.ts"], ["src/client", "node_modules"]);
    });
}

module CleanTasks {
    import GeneratedDir = Configurations.TempDirectories.generatedDir;
    desc("Suppression des fichiers temporaires");
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
            description: 'Lancement des tests servers',
            files: testsFileList.toArray(),
            mochaOptions: {
                ui: 'bdd',
                reporter: 'nyan'
            },
            prerequisites: ["beforeTest", "Typescript"]
        });
    desc("Lancement des tests serveurs");
    task("testServerCode", ["testServerBody"], () => {
        console.log("OK !");
        console.log();
    });

    desc("Lancement des tests clients");
    task("testClient", ["Typescript"], () => {
        console.log("Karma client test");
        var karmaConfigurationFileContent = 'module.exports = function (config) {config.set(' + JSON.stringify(Configurations.Karma.runnerOptions) + ');};';

        fs.writeFileSync("generated/karma.conf.js", karmaConfigurationFileContent);

        Helpers.executeCommand("karma run generated/karma.conf.js", true, (stdout, stderr) => {
            KarmaHelpers.assertAllBrowsersAreTested(stdout);
            console.log("OK !");
            console.log();
            complete();
        }, (stdout, stderr) => {
                console.log("Failed !");
                console.log();
                fail();
            });
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

            if (untestedBrowsers.length > 0) {
                console.log(untestedBrowsers.join(", ") + " are not tested");
                fail();
            }
        }
    }

}

module Utility {
    task("node", () => {
        console.log("detection de Node.js...");

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