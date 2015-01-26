var Infrastructure = require("./Infrastructure/Infrastructure");

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
            Infrastructure.IEventDispatcher.getInstance().unregisterToEvent(expected.constructor, onEventTriggered);

            if (event.equals(expected)) {
                success = true;
            }
        };
        Infrastructure.IEventDispatcher.getInstance().registerToEvent(expected.constructor, onEventTriggered);

        var commandeDispatcher = Infrastructure.ICommandDispatcher.getInstance();
        commandeDispatcher.dispatchCommand(this.commande);

        if (!success)
            fail();
    };
    return ThenContext;
})();
exports.ThenContext = ThenContext;
