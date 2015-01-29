/// <reference path="../../Scripts/GlobalReferences.d.ts"/>

import server = require('./server');
import assert = require("assert");
require("should");
import http = require("http");
import fs = require("fs");

var BASE_PORT = 8080;
var BASE_URL = "http://localhost:" + BASE_PORT;

describe("Serveur >", () => {
    describe("OK cases >", () => {
        
        var myServer: server;
        var testDir = "generated/test";
        var testFile = testDir + "/index.html";
        var expectedData = "Ceci est dans un fichier";
        var testErrorFile = testDir + "/404.html";
        var expectedData404 = "404 error, file content";

        before((done) => {
            myServer = new server();
            myServer.start(BASE_PORT, testDir, testErrorFile,() => {
                fs.writeFileSync(testFile, expectedData);
                fs.writeFileSync(testErrorFile, expectedData404);
                done();
            });
            
        });

        it('Server serves hompage on /index.html', (done) => {
            httpTextGet(BASE_URL, (response, data) => {
                response.statusCode.should.equal(200);
                data.indexOf(expectedData).should.not.be.lessThan(0);
                response.headers["content-type"].indexOf("text/html").should.not.be.lessThan(0);
                done();
            });
        });


        it('Server serves homepage', (done) => {
            
            httpTextGet(BASE_URL, (response, data) => {
                response.statusCode.should.equal(200);
                data.indexOf(expectedData).should.not.be.lessThan(0);
                response.headers["content-type"].indexOf("text/html").should.not.be.lessThan(0);
                done();
            });
        });


        it('Server serves a 404 at other pages', (done) => {
            httpTextGet(BASE_URL+"/bargle", (response, data) => {
                response.statusCode.should.equal(404);
                data.indexOf(expectedData404).should.not.be.lessThan(0);
                response.headers["content-type"].indexOf("text/html").should.not.be.lessThan(0);
                done();
            });
        });

        after(() => {
            fs.unlinkSync(testFile);
            assert.ok(!fs.existsSync(testFile), "the file " + testFile + " is not deleted");
            fs.unlinkSync(testErrorFile);
            assert.ok(!fs.existsSync(testErrorFile), "The file " + testFile + " is not deleted");
            myServer.stop();
        });

    });
    describe("Error cases >", () => {
        it("Start a server without a port is not possible", () => {
            var myServer = new server();
            assert.throws(() => {
                myServer.start(null, null, null, ()=>{});
            }, "a port should be necessary");
        });
        it("Starting a server without a file to serve is not possible", () => {
            var myServer = new server();
            assert.throws(() => {
                myServer.start(BASE_PORT, null, null, () => { });
            }, "an homepage should be necessary");
        });

        it("Starting a server without a 404 file is not possible", () => {
            var myServer = new server();
            assert.throws(() => {
                myServer.start(BASE_PORT, "/", null, () => { });
            }, "a 404 should be necessary");
        });

        it("Starting a server already started should not be possible", () => {
            var myServer = new server();
            myServer.start(BASE_PORT, "/", "404.html", () => { });
            assert.throws(() => {
                myServer.start(BASE_PORT, "/", "404.html", () => { });
            }, "It should not be possible to start the server if already started");

            myServer.stop();
        });

        it("Stoping a server without having it started is not possible", () => {
            var myServer = new server();
            assert.throws(() => {
                myServer.stop();
            }, "It should not be possible to start the server without starting it first");
        });
    });

});

function httpTextGet(url: string, callback: (response: http.ClientResponse, responseData: string) => void) {
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