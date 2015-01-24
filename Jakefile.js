/// <reference path="Scripts/GlobalReferences.d.ts"/>
var fs = require("fs");

desc("Default task for everything");
task("default", ["Typescript", "testServerCode", "testClient", "node"], function () {
});

var Configurations;
(function (Configurations) {
    (function (Node) {
        Node.desiredVersion = "v0.10.25";
    })(Configurations.Node || (Configurations.Node = {}));
    var Node = Configurations.Node;

    (function (TempDirectories) {
        TempDirectories.generatedDir = "generated";
        TempDirectories.tempTestfileDir = TempDirectories.generatedDir + "/test";
    })(Configurations.TempDirectories || (Configurations.TempDirectories = {}));
    var TempDirectories = Configurations.TempDirectories;

    (function (Karma) {
        Karma.runnerOptions = {
            basePath: '.',
            frameworks: ['mocha', 'requirejs'],
            files: [
                'node_modules/expect.js/index.js',
                'src/client/_*_test.js'
            ],
            exclude: [],
            preprocessors: {},
            reporters: ['dot'],
            port: 9876,
            colors: true,
            autoWatch: false,
            browsers: [],
            singleRun: false
        };

        Karma.supportedBrowsers = [
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
    })(Configurations.Karma || (Configurations.Karma = {}));
    var Karma = Configurations.Karma;
})(Configurations || (Configurations = {}));

var TypescriptTasks;
(function (TypescriptTasks) {
    desc("Compilation des tous les typescript");
    task("Typescript", ["TypescriptClient", "TypescriptServer"]);

    desc("Compilation des typescript client");
    task("TypescriptClient", ["TypescriptClientArgumentFile"], function () {
        console.log("compilation Typescript client...");
        Helpers.executeCommand("tsc --module AMD @tscClientFiles.txt", true, complete, fail);
    }, { async: true });

    desc("Création @tscClientFiles");
    task("TypescriptClientArgumentFile", [], function () {
        Helpers.writeFileNamesToFile("tscClientFiles.txt", ["src/client/**/*.ts"], ["node_modules"]);
    });

    desc("Compilation des typescript server");
    task("TypescriptServer", ["TypescriptServerArgumentFile"], function () {
        console.log("compilation Typescript serveur...");
        Helpers.executeCommand("tsc --module commonJS @tscServerFiles.txt", true, complete, fail);
    }, { async: true });

    desc("Création @tscServerFiles");
    task("TypescriptServerArgumentFile", [], function () {
        Helpers.writeFileNamesToFile("tscServerFiles", ["**/*.ts"], ["src/client", "node_modules"]);
    });
})(TypescriptTasks || (TypescriptTasks = {}));

var CleanTasks;
(function (CleanTasks) {
    var GeneratedDir = Configurations.TempDirectories.generatedDir;
    desc("Suppression des fichiers temporaires");
    task("clean", [], function () {
        jake.rmRf(GeneratedDir);
    });
})(CleanTasks || (CleanTasks = {}));

var TestTasks;
(function (TestTasks) {
    var TempTestfileDir = Configurations.TempDirectories.tempTestfileDir;
    desc("Test everything");
    task('test', ["testServerCode", "testClient"]);

    directory(TempTestfileDir);
    task("beforeTest", [TempTestfileDir, "node"], function () {
        console.log("Mocha server test");
    });

    var testsFileList = new jake.FileList();
    testsFileList.include("**/_*_test.js");
    testsFileList.exclude("node_modules");
    testsFileList.exclude("src/client");
    var mocha = require('jake-mocha');

    mocha.defineTask({
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
    task("testServerCode", ["testServerBody"], function () {
        console.log("OK !");
        console.log();
    });

    desc("Lancement des tests clients");
    task("testClient", ["Typescript"], function () {
        console.log("Karma client test");
        var karmaConfigurationFileContent = 'module.exports = function (config) {config.set(' + JSON.stringify(Configurations.Karma.runnerOptions) + ');};';

        fs.writeFileSync("generated/karma.conf.js", karmaConfigurationFileContent);

        Helpers.executeCommand("karma run generated/karma.conf.js", true, function (stdout, stderr) {
            KarmaHelpers.assertAllBrowsersAreTested(stdout);
            console.log("OK !");
            console.log();
            complete();
        }, function (stdout, stderr) {
            console.log("Failed !");
            console.log();
            fail();
        });
    }, { async: true });

    var KarmaHelpers;
    (function (KarmaHelpers) {
        function assertAllBrowsersAreTested(karmaOutput) {
            var untestedBrowsers = [];

            Configurations.Karma.supportedBrowsers.forEach(function (browser) {
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
        KarmaHelpers.assertAllBrowsersAreTested = assertAllBrowsersAreTested;
    })(KarmaHelpers || (KarmaHelpers = {}));
})(TestTasks || (TestTasks = {}));

var Utility;
(function (Utility) {
    task("node", function () {
        console.log("detection de Node.js...");

        Helpers.executeCommand("node --version", false, function (stdout) {
            if (stdout.indexOf(Configurations.Node.desiredVersion) !== 0) {
                fail("Incorrect node version. Expected " + Configurations.Node.desiredVersion + ", found " + stdout);
            } else
                complete();
        }, fail);
    }, { async: true });
})(Utility || (Utility = {}));

var Helpers;
(function (Helpers) {
    function executeCommand(command, pipeOutputs, complete, fail) {
        var stdout = "";
        var stderr = "";
        var childProcess = jake.createExec(command, { printStdout: true, printStderr: true });
        childProcess.on("stdout", function (chunk) {
            if (pipeOutputs)
                process.stdout.write(chunk);
            stdout += chunk;
        });
        childProcess.on("stderr", function (chunk) {
            if (pipeOutputs)
                process.stderr.write(chunk);
            stderr += chunk;
        });
        childProcess.on("error", function (chunk) {
            process.stderr.write(chunk);
            fail(stdout, stderr);
        });
        childProcess.on("cmdEnd", function () {
            complete(stdout, stderr);
        });
        childProcess.run();
    }
    Helpers.executeCommand = executeCommand;

    function writeFileNamesToFile(fileName, includes, excludes) {
        var fileList = new jake.FileList();
        if (includes != null)
            includes.forEach(function (include) {
                fileList.include(include);
            });
        if (excludes != null)
            excludes.forEach(function (exclude) {
                fileList.exclude(exclude);
            });

        var fileContent = fileList.toArray().join(" ");
        fs.writeFileSync(fileName, fileContent);
    }
    Helpers.writeFileNamesToFile = writeFileNamesToFile;
})(Helpers || (Helpers = {}));
