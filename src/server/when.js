var IEventDispatcher = require("./Infrastructure/IEventDispatcher");

var CommandDispatcher = require("./Infrastructure/CommandDispatcher");

function commande(commande) {
    return new ThenContext(commande);
}
exports.commande = commande;

var ThenContext = (function () {
    function ThenContext(commande) {
        this.commande = commande;
    }
    ThenContext.prototype.thenExpect = function (expected) {
        var success = false;
        var onEventTriggered = function (event) {
            IEventDispatcher.GetInstance().unregisterToEvent(expected.getEventName(), onEventTriggered);
            if (event.equals(expected)) {
                success = true;
            }
        };
        IEventDispatcher.GetInstance().registerToEvent(expected.getEventName(), onEventTriggered);

        var commandeDispatcher = new CommandDispatcher();
        commandeDispatcher.dispatchCommand(this.commande);

        if (!success)
            fail();
    };
    return ThenContext;
})();
exports.ThenContext = ThenContext;
