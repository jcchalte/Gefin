/// <reference path="../../Scripts/GlobalReferences.d.ts"/>
var server = require('./server');
var assert = require("assert");
require("should");
var http = require("http");
var fs = require("fs");

var BASE_PORT = 8080;
var BASE_URL = "http://localhost:" + BASE_PORT;

describe("Serveur >", function () {
    describe("Cas classiques >", function () {
        var myServer;
        var testDir = "generated/test";
        var testFile = testDir + "/test.html";
        var expectedData = "Ceci est dans un fichier";
        var testErrorFile = testDir + "/404.html";
        var expectedData404 = "Erreur 404, contenu du fichier";

        before(function (done) {
            myServer = new server();
            myServer.start(BASE_PORT, testFile, testErrorFile, function () {
                fs.writeFileSync(testFile, expectedData);
                fs.writeFileSync(testErrorFile, expectedData404);
                done();
            });
        });

        it('Server renvoit un fichier sur la page de garde', function (done) {
            httpTextGet(BASE_URL, function (response, data) {
                response.statusCode.should.equal(200);
                data.indexOf(expectedData).should.not.be.lessThan(0);
                response.headers["content-type"].indexOf("text/html").should.not.be.lessThan(0);
                done();
            });
        });

        it('Server renvoit un fichier sur index.html', function (done) {
            httpTextGet(BASE_URL, function (response, data) {
                response.statusCode.should.equal(200);
                data.indexOf(expectedData).should.not.be.lessThan(0);
                response.headers["content-type"].indexOf("text/html").should.not.be.lessThan(0);
                done();
            });
        });

        it('Server renvoit une erreur 404 dans les autres pages', function (done) {
            httpTextGet(BASE_URL + "/bargle", function (response, data) {
                response.statusCode.should.equal(404);
                data.indexOf(expectedData404).should.not.be.lessThan(0);
                response.headers["content-type"].indexOf("text/html").should.not.be.lessThan(0);
                done();
            });
        });

        after(function () {
            fs.unlinkSync(testFile);
            assert.ok(!fs.existsSync(testFile), "Le fichier " + testFile + " n'est pas supprimé");
            fs.unlinkSync(testErrorFile);
            assert.ok(!fs.existsSync(testErrorFile), "Le fichier " + testFile + " n'est pas supprimé");
            myServer.stop();
        });
    });
    describe("Cas d'erreurs >", function () {
        it("Démarrer un serveur sans port n'est pas possible", function () {
            var myServer = new server();
            assert.throws(function () {
                myServer.start(null, null, null, function () {
                });
            }, "Un port est nécessaire");
        });
        it("Démarrer un serveur sans un fichier à service n'est pas possible", function () {
            var myServer = new server();
            assert.throws(function () {
                myServer.start(BASE_PORT, null, null, function () {
                });
            }, "Une homepage est nécessaire");
        });

        it("Démarrer un serveur sans un fichier d'erreur à service n'est pas possible", function () {
            var myServer = new server();
            assert.throws(function () {
                myServer.start(BASE_PORT, "test.html", null, function () {
                });
            }, "Un fichier d'erreur est nécessaire");
        });

        it("Démarrer un serveur alors qu\'il est déjà démarré n'est pas possible", function () {
            var myServer = new server();
            myServer.start(BASE_PORT, "test.html", "404.html", function () {
            });
            assert.throws(function () {
                myServer.start(BASE_PORT, "test.html", "404.html", function () {
                });
            }, "Il ne doit pas être possible de redémarrer le serveur s'il est déjà démarré");

            myServer.stop();
        });

        it("Arrêter un serveur avant qu\'il ne soit démarré n'est pas possible", function () {
            var myServer = new server();
            assert.throws(function () {
                myServer.stop();
            }, "Il ne doit pas être possible d'arrêter le serveur sans l'avoir démarré au préalable");
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
