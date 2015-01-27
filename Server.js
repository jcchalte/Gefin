/// <reference path="./Scripts/GlobalReferences.d.ts"/>
var server = require("./src/server/server");
(function () {
    var myServer = new server();
    var port = process.env.PORT || Number(process.argv[2]) || 8080;
    myServer.start(port, "src/server/Views/homepage.html", "src/server/Views/404.html", function () {
        console.log("Server Ready to serve on port " + port + "...");
    });
})();
