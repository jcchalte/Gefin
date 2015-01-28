var Infrastructure = require("./Infrastructure/Infrastructure");
var TestThat;
(function (TestThat) {
    function given(events) {
        return new GivenContext(events);
    }
    TestThat.given = given;
    function when(command) {
        return new WhenContext(command);
    }
    TestThat.when = when;
    var GivenContext = (function () {
        function GivenContext(events) {
            this.events = events;
        }
        GivenContext.prototype.when = function (command) {
            Infrastructure.IEventRepository.getInstance().commitEvents(this.events);
            return new WhenContext(command);
        };
        GivenContext.prototype.and = function (events) {
            return new GivenContext(this.events.concat(events));
        };
        return GivenContext;
    })();
    var WhenContext = (function () {
        function WhenContext(command) {
            this.command = command;
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
            var commandDispatcher = Infrastructure.ICommandDispatcher.getInstance();
            commandDispatcher.dispatchCommand(this.command);
            if (!success)
                fail();
            else
                done();
        };
        WhenContext.prototype.thenItFails = function (assertOnErrorOrDone, done) {
            var realDone = done != null ? done : assertOnErrorOrDone;
            var assertOnError = done != null ? assertOnErrorOrDone : null;
            try {
                var commandDispatcher = Infrastructure.ICommandDispatcher.getInstance();
                commandDispatcher.dispatchCommand(this.command);
            }
            catch (exception) {
                if (assertOnError != null) {
                    if (assertOnError(exception)) {
                        done();
                    }
                    else {
                        fail("Exception " + exception + " does not respect the assertion");
                    }
                }
                else {
                    realDone();
                }
            }
        };
        return WhenContext;
    })();
})(TestThat || (TestThat = {}));
module.exports = TestThat;
