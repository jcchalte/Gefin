/// <reference path="../../Scripts/GlobalReferences.d.ts"/>
var http = require("http");
var fs = require("fs");
var Server = (function () {
    function Server() {
        var _this = this;
        this.server = http.createServer();
        this.server.on("request", function (request, response) {
            if (request.url === "/" || request.url === "/Index") {
                _this.serveFile(response, _this.homepageFilePath);
            }
            else {
                response.statusCode = 404;
                _this.serveFile(response, _this.errorpageFilePath);
            }
        });
        this.isRunning = false;
    }
    Server.prototype.start = function (port, homepageFilePath, errorpageFilePath, done) {
        if (port === null || port === 0) {
            throw Error("Port is mandatory");
        }
        if (homepageFilePath === null || homepageFilePath === "") {
            throw Error("homepage file is mandatory");
        }
        if (errorpageFilePath === null || errorpageFilePath === "") {
            throw Error("404 file should be mandatory");
        }
        if (this.isRunning)
            throw Error("Server already started.");
        this.homepageFilePath = homepageFilePath;
        this.errorpageFilePath = errorpageFilePath;
        this.isRunning = true;
        this.server.listen(port, done);
    };
    Server.prototype.stop = function () {
        if (!this.isRunning)
            throw Error("Server not started.");
        this.isRunning = false;
        this.server.close();
    };
    Server.prototype.serveFile = function (response, filePath) {
        fs.readFile(filePath, function (err, data) {
            if (err)
                throw err;
            response.setHeader("content-type", "text/html; charset=UTF-8");
            response.end(data);
        });
    };
    return Server;
})();
module.exports = Server;
