var Infrastructure = require("./Infrastructure/Infrastructure");
var TestThat;
(function (TestThat) {
    function given(events) {
        return new GivenContext(events);
    }
    TestThat.given = given;
    function when(commande) {
        return new WhenContext(commande);
    }
    TestThat.when = when;
    var GivenContext = (function () {
        function GivenContext(events) {
            this.events = events;
        }
        GivenContext.prototype.when = function (commande) {
            Infrastructure.IEventRepository.getInstance().commitEvents(this.events);
            return new WhenContext(commande);
        };
        GivenContext.prototype.and = function (events) {
            return new GivenContext(this.events.concat(events));
        };
        return GivenContext;
    })();
    var WhenContext = (function () {
        function WhenContext(commande) {
            this.commande = commande;
        }
        WhenContext.prototype.then = function (expected, done) {
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
            else
                done();
        };
        WhenContext.prototype.thenItFails = function (done) {
            try {
                var commandeDispatcher = Infrastructure.ICommandDispatcher.getInstance();
                commandeDispatcher.dispatchCommand(this.commande);
            }
            catch (exception) {
                done();
            }
        };
        return WhenContext;
    })();
})(TestThat || (TestThat = {}));
module.exports = TestThat;
