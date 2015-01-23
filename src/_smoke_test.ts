/// <reference path="../Scripts/GlobalReferences.d.ts"/>

import assert = require("assert");
import child_process = require("child_process");
import http = require("http");
require("should");

describe("Smoke testing >", () => {
    describe("Cas classiques >", () => {
        var childProcess;
        before((done) => {
            childProcess = runServer("node src/server/Gefin 8082", () => {
                done();
            });
        });



        it('Can get homepage', (done) => {
            httpTextGet("http://localhost:8082/", (response, content) => {
                response.statusCode.should.equal(200, "La code de retour du smoke test n'est pas 200");
                done();
            });
        });

        it('Can get 404', (done) => {
            httpTextGet("http://localhost:8082/autrePageQuiNexistePas", (response, content) => {
                response.statusCode.should.equal(404, "La code de retour du smoke test n'est pas 404");
                done();
            });
        });

        after((done) => {
            childProcess.on("exit", () => {
                done();
            });
            childProcess.kill();
        });
    });
});

function runServer(command: string, done: () => void): child_process.ChildProcess {

    var words = command.split(" ");

    var childProcess = child_process.spawn(words[0], words.slice(1));

    childProcess.stdout.setEncoding('utf8');

    childProcess.stdout.on("data", (chunk: string) => {
        if (chunk.trim().indexOf("Server Ready to serve...") >= 0)
            done();
    });
    childProcess.stderr.on("data", (chunk) => {
        console.log("stderr : " + chunk);
    });
    childProcess.on("exit", (code, signal) => {
    });

    return childProcess;
}

function httpTextGet(url: string, callback: (response: http.ServerResponse, responseData: string) => void) {
    http.get(url, (response) => {
        var data = "";
        response.setEncoding('utf8');
        response.on("data", (chunk: string) => {
            data += chunk;
        });
        response.on("end", () => {
            callback(response, data);
        });
    });
}