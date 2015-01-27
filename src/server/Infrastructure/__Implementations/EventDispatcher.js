var EventDispatcher = (function () {
    function EventDispatcher() {
        this.registeredCallbacks = [];
    }
    EventDispatcher.prototype.registerToEvent = function (eventConstructor, callback) {
        var matchingEntry = this.registeredCallbacks.filter(function (group) {
            return group.eventConstructor === eventConstructor;
        })[0];
        if (matchingEntry == null) {
            matchingEntry = {
                eventConstructor: eventConstructor,
                callbacks: []
            };
            this.registeredCallbacks.push(matchingEntry);
        }
        matchingEntry.callbacks.push(callback);
    };
    EventDispatcher.prototype.unregisterToEvent = function (eventConstructor, callback) {
        var matchingEntry = this.registeredCallbacks.filter(function (group) {
            return group.eventConstructor === eventConstructor;
        })[0];
        matchingEntry.callbacks = matchingEntry.callbacks.filter(function (existingCallback) {
            return existingCallback !== callback;
        });
    };
    EventDispatcher.prototype.dispatchEvent = function (event) {
        var eventConstructor = event.constructor;
        var matchingEntry = this.registeredCallbacks.filter(function (group) {
            return group.eventConstructor === eventConstructor;
        })[0];
        if (matchingEntry) {
            matchingEntry.callbacks.forEach(function (callback) {
                callback(event);
            });
        }
    };
    return EventDispatcher;
})();
module.exports = EventDispatcher;
