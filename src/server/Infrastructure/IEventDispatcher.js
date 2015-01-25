var EventDispatcher = require("./EventDispatcher");


var IEventDispatcher;
(function (IEventDispatcher) {
    var instance = new EventDispatcher();

    function GetInstance() {
        return instance;
    }
    IEventDispatcher.GetInstance = GetInstance;
})(IEventDispatcher || (IEventDispatcher = {}));
module.exports = IEventDispatcher;
