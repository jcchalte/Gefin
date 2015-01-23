/// <reference path="../Scripts/GlobalReferences.d.ts"/>
var child_process = require("child_process");
var http = require("http");
require("should");

describe("Smoke testing >", function () {
    describe("Cas classiques >", function () {
        var childProcess;
        before(function (done) {
            childProcess = runServer("node Server 8082", function () {
                done();
            });
        });

        it('Can get homepage', function (done) {
            httpTextGet("http://localhost:8082/", function (response, content) {
                response.statusCode.should.equal(200, "La code de retour du smoke test n'est pas 200");
                done();
            });
        });

        it('Can get 404', function (done) {
            httpTextGet("http://localhost:8082/autrePageQuiNexistePas", function (response, content) {
                response.statusCode.should.equal(404, "La code de retour du smoke test n'est pas 404");
                done();
            });
        });

        after(function (done) {
            childProcess.on("exit", function () {
                done();
            });
            childProcess.kill();
        });
    });
});

function runServer(command, done) {
    var words = command.split(" ");

    var childProcess = child_process.spawn(words[0], words.slice(1));

    childProcess.stdout.setEncoding('utf8');

    childProcess.stdout.on("data", function (chunk) {
        if (chunk.trim().indexOf("Server Ready to serve") >= 0)
            done();
    });
    childProcess.stderr.on("data", function (chunk) {
        console.log("stderr : " + chunk);
    });
    childProcess.on("exit", function (code, signal) {
    });

    return childProcess;
}

function httpTextGet(url, callback) {
    http.get(url, function (response) {
        var data = "";
        response.setEncoding('utf8');
        response.on("data", function (chunk) {
            data += chunk;
        });
        response.on("end", function () {
            callback(response, data);
        });
    });
}
