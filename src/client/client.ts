
export = Client
module Client {
    export function init() {
        var div = document.createElement("div");
        div.setAttribute("id", "tdjs");
        div.setAttribute("foo", "bar");
        document.body.appendChild(div);
    }
}