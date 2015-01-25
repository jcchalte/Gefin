var EventDispatcher = require("./EventDispatcher");


// ReSharper disable once InconsistentNaming
var IEventDispatcher;
(function (IEventDispatcher) {
    var instance = new EventDispatcher();

    function getInstance() {
        return instance;
    }
    IEventDispatcher.getInstance = getInstance;
})(IEventDispatcher || (IEventDispatcher = {}));
module.exports = IEventDispatcher;
