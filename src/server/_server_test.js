/// <reference path="../../Scripts/GlobalReferences.d.ts"/>
var server = require('./server');
var assert = require("assert");
require("should");
var http = require("http");
var fs = require("fs");
var BASE_PORT = 8080;
var BASE_URL = "http://localhost:" + BASE_PORT;
describe("Serveur >", function () {
    describe("OK cases >", function () {
        var myServer;
        var testDir = "generated/test";
        var testFile = testDir + "/index.html";
        var expectedData = "Ceci est dans un fichier";
        var testErrorFile = testDir + "/404.html";
        var expectedData404 = "404 error, file content";
        before(function (done) {
            myServer = new server();
            myServer.start(BASE_PORT, testDir, testErrorFile, function () {
                fs.writeFileSync(testFile, expectedData);
                fs.writeFileSync(testErrorFile, expectedData404);
                done();
            });
        });
        it('Server serves hompage on /index.html', function (done) {
            httpTextGet(BASE_URL, function (response, data) {
                response.statusCode.should.equal(200);
                data.indexOf(expectedData).should.not.be.lessThan(0);
                response.headers["content-type"].indexOf("text/html").should.not.be.lessThan(0);
                done();
            });
        });
        it('Server serves homepage', function (done) {
            httpTextGet(BASE_URL, function (response, data) {
                response.statusCode.should.equal(200);
                data.indexOf(expectedData).should.not.be.lessThan(0);
                response.headers["content-type"].indexOf("text/html").should.not.be.lessThan(0);
                done();
            });
        });
        it('Server serves a 404 at other pages', function (done) {
            httpTextGet(BASE_URL + "/bargle", function (response, data) {
                response.statusCode.should.equal(404);
                data.indexOf(expectedData404).should.not.be.lessThan(0);
                response.headers["content-type"].indexOf("text/html").should.not.be.lessThan(0);
                done();
            });
        });
        after(function () {
            fs.unlinkSync(testFile);
            assert.ok(!fs.existsSync(testFile), "the file " + testFile + " is not deleted");
            fs.unlinkSync(testErrorFile);
            assert.ok(!fs.existsSync(testErrorFile), "The file " + testFile + " is not deleted");
            myServer.stop();
        });
    });
    describe("Error cases >", function () {
        it("Start a server without a port is not possible", function () {
            var myServer = new server();
            assert.throws(function () {
                myServer.start(null, null, null, function () {
                });
            }, "a port should be necessary");
        });
        it("Starting a server without a file to serve is not possible", function () {
            var myServer = new server();
            assert.throws(function () {
                myServer.start(BASE_PORT, null, null, function () {
                });
            }, "an homepage should be necessary");
        });
        it("Starting a server without a 404 file is not possible", function () {
            var myServer = new server();
            assert.throws(function () {
                myServer.start(BASE_PORT, "/", null, function () {
                });
            }, "a 404 should be necessary");
        });
        it("Starting a server already started should not be possible", function () {
            var myServer = new server();
            myServer.start(BASE_PORT, "/", "404.html", function () {
            });
            assert.throws(function () {
                myServer.start(BASE_PORT, "/", "404.html", function () {
                });
            }, "It should not be possible to start the server if already started");
            myServer.stop();
        });
        it("Stoping a server without having it started is not possible", function () {
            var myServer = new server();
            assert.throws(function () {
                myServer.stop();
            }, "It should not be possible to start the server without starting it first");
        });
    });
});
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
