/// <reference path="../../Scripts/GlobalReferences.d.ts"/>

import server = require('./server');
import assert = require("assert");
require("should");
import http = require("http");
import fs = require("fs");



describe("Serveur >", () => {
    describe("Cas classiques >", () => {

        var myServer: server;
        var testDir = "generated/test";
        var testFile = testDir + "/test.html";
        var expectedData = "Ceci est dans un fichier";
        var testErrorFile = testDir + "/404.html";
        var expectedData404 = "Erreur 404, contenu du fichier";

        before((done) => {
            myServer = new server();
            myServer.start(8080, testFile, testErrorFile,() => {
                fs.writeFileSync(testFile, expectedData);
                fs.writeFileSync(testErrorFile, expectedData404);
                done();
            });
            
        });

        it('Server renvoit un fichier sur la page de garde', (done) => {
            httpTextGet("http://localhost:8080", (response, data) => {
                response.statusCode.should.equal(200);
                data.indexOf(expectedData).should.not.be.lessThan(0);
                response.headers["content-type"].indexOf("text/html").should.not.be.lessThan(0);
                done();
            });
        });

        it('Server renvoit un fichier sur index.html', (done) => {
            httpTextGet("http://localhost:8080/Index", (response, data) => {
                response.statusCode.should.equal(200);
                data.indexOf(expectedData).should.not.be.lessThan(0);
                response.headers["content-type"].indexOf("text/html").should.not.be.lessThan(0);
                done();
            });
        });

        it('Server renvoit une erreur 404 dans les autres pages', (done) => {
            httpTextGet("http://localhost:8080/BlaBlaBla", (response, data) => {
                response.statusCode.should.equal(404);
                data.indexOf(expectedData404).should.not.be.lessThan(0);
                response.headers["content-type"].indexOf("text/html").should.not.be.lessThan(0);
                done();
            });
        });

        after(() => {
            fs.unlinkSync(testFile);
            assert.ok(!fs.existsSync(testFile), "Le fichier " + testFile + " n'est pas supprimé");
            fs.unlinkSync(testErrorFile);
            assert.ok(!fs.existsSync(testErrorFile), "Le fichier " + testFile + " n'est pas supprimé");
            myServer.stop();
        });

    });
    describe("Cas d'erreurs >", () => {
        it("Démarrer un serveur sans port n'est pas possible", () => {
            var myServer = new server();
            assert.throws(() => {
                myServer.start(null, null, null, ()=>{});
            }, "Un port est nécessaire");
        });
        it("Démarrer un serveur sans un fichier à service n'est pas possible", () => {
            var myServer = new server();
            assert.throws(() => {
                myServer.start(8080, null, null, () => { });
            }, "Une homepage est nécessaire");
        });

        it("Démarrer un serveur sans un fichier d'erreur à service n'est pas possible", () => {
            var myServer = new server();
            assert.throws(() => {
                myServer.start(8080, "test.html", null, () => { });
            }, "Un fichier d'erreur est nécessaire");
        });

        it("Démarrer un serveur alors qu\'il est déjà démarré n'est pas possible", () => {
            var myServer = new server();
            myServer.start(8080, "test.html", "404.html", () => { });
            assert.throws(() => {
                myServer.start(8080, "test.html", "404.html", () => { });
            }, "Il ne doit pas être possible de redémarrer le serveur s'il est déjà démarré");

            myServer.stop();
        });

        it("Arrêter un serveur avant qu\'il ne soit démarré n'est pas possible", () => {
            var myServer = new server();
            assert.throws(() => {
                myServer.stop();
            }, "Il ne doit pas être possible d'arrêter le serveur sans l'avoir démarré au préalable");
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