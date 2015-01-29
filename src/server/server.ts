/// <reference path="../../Scripts/GlobalReferences.d.ts"/>

export = Server
import http = require("http");
import fs = require("fs");
var send = require("send");
import url = require("url");

class Server {
    private server: http.Server;

    private isRunning: boolean;

    private rootDirectory: string;

    private errorpageFilePath: string;

    constructor() {
        this.server = http.createServer();
        this.server.on("request", (request, response) => {
            send(request, request.url, {
                root: this.rootDirectory
            }).on("error", (err) => {
                    response.statusCode = err.status || 500;
                    this.serveFile(response, this.errorpageFilePath);
                })
                .pipe(response);
        });
        this.isRunning = false;
    }

    public start(port: number, rootDirectory: string, errorpageFilePath: string, done: () => void) {

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
    }

    stop() {
        if (!this.isRunning)
            throw Error("Server not started.");
        this.isRunning = false;
        this.server.close();
    }

    private serveFile(response: http.ServerResponse, filePath: string) {
        fs.readFile(filePath, (err, data) => {
            if (err) throw err;
            response.setHeader("content-type", "text/html; charset=UTF-8");
            response.end(data);
        });
    }
}