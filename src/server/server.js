var http = require("http");
var fs = require("fs");

var Server = (function () {
    function Server() {
        var _this = this;
        this.server = http.createServer();
        this.server.on("request", function (request, response) {
            if (request.url === "/" || request.url === "/Index") {
                _this.serveFile(response, _this.homepageFilePath);
            } else {
                response.statusCode = 404;
                _this.serveFile(response, _this.errorpageFilePath);
            }
        });
        this.isRunning = false;
    }
    Server.prototype.start = function (port, homepageFilePath, errorpageFilePath, done) {
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
    };

    Server.prototype.stop = function () {
        if (!this.isRunning)
            throw "Le serveur n'est pas démarré.";
        this.isRunning = false;
        this.server.close();
    };

    Server.prototype.serveFile = function (response, filePath) {
        fs.readFile(filePath, function (err, data) {
            if (err)
                throw err;
            response.end(data);
        });
    };
    return Server;
})();
module.exports = Server;
