define(["require", "exports"], function(require, exports) {
    
    var Client;
    (function (Client) {
        function init() {
            var div = document.createElement("div");
            div.setAttribute("id", "tdjs");
            div.setAttribute("foo", "bar");
            document.body.appendChild(div);
        }
        Client.init = init;
    })(Client || (Client = {}));
    return Client;
});
