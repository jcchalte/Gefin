/// <reference path="../../Scripts/GlobalReferences.d.ts"/>
var http = require("http");
var fs = require("fs");
var send = require("send");
var Server = (function () {
    function Server() {
        var _this = this;
        this.server = http.createServer();
        this.server.on("request", function (request, response) {
            send(request, request.url, {
                root: _this.rootDirectory
            }).on("error", function (err) {
                response.statusCode = err.status || 500;
                _this.serveFile(response, _this.errorpageFilePath);
            }).pipe(response);
        });
        this.isRunning = false;
    }
    Server.prototype.start = function (port, rootDirectory, errorpageFilePath, done) {
        if (port === null || port === 0) {
            throw Error("Port is mandatory");
        }
        if (rootDirectory === null || rootDirectory === "") {
            throw Error("root directory is mandatory");
        }
        if (errorpageFilePath === null || errorpageFilePath === "") {
            throw Error("404 file should be mandatory");
        }
        if (this.isRunning)
            throw Error("Server already started.");
        this.rootDirectory = rootDirectory;
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
