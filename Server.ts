﻿/// <reference path="./Scripts/GlobalReferences.d.ts"/>

import server = require("./src/server/server");

(() => {
    var myServer = new server();

    var port = process.env.PORT || Number(process.argv[2]) || 8080;
    myServer.start(port, "src/server/Views", "src/server/Views/404.html", () => {
        console.log("Server Ready to serve on port "+port+"...");
    });
})();