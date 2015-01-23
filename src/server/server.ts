/// <reference path="../../Scripts/GlobalReferences.d.ts"/>

export = Server
import http = require("http");
import fs = require("fs");

class Server {
    private server: http.Server;

    private isRunning: boolean;

    private homepageFilePath: string;

    private errorpageFilePath: string;

    constructor() {
        this.server = http.createServer();
        this.server.on("request", (request, response) => {
            
            if (request.url === "/" || request.url === "/Index") {
                this.serveFile(response, this.homepageFilePath);
            } else {
                response.statusCode = 404;
                this.serveFile(response, this.errorpageFilePath);
            }
        });
        this.isRunning = false;
    }

    public start(port: number, homepageFilePath: string, errorpageFilePath:string, done:()=>void) {

        if (port === null || port === 0) {
            throw "Le port est obligatoire";
        }
        if (homepageFilePath === null || homepageFilePath === "") {
            throw "Le fichier à servir est obligatoire";
        }
        if (errorpageFilePath === null || errorpageFilePath === "") {
            throw "Le fichier d'erreur est obligatoire";
        }

        if (this.isRunning)
            throw "Le serveur est déjà démarré.";
        this.homepageFilePath = homepageFilePath;
        this.errorpageFilePath = errorpageFilePath;
        this.isRunning = true;
        this.server.listen(port, done);
    }

    stop() {
        if (!this.isRunning)
            throw "Le serveur n'est pas démarré.";
        this.isRunning = false;
        this.server.close();
    }

    private serveFile(response: http.ServerResponse, filePath: string) {
        fs.readFile(filePath, (err, data) => {
            if (err) throw err;
            response.end(data);
        });
    }
}