var EventDispatcher = (function () {
    function EventDispatcher() {
        this.registeredCallbacks = [];
    }
    EventDispatcher.prototype.registerToEvent = function (eventType, callback) {
        var matchingEntry = this.registeredCallbacks.filter(function (group) {
            return group.eventType === eventType;
        })[0];
        if (matchingEntry == null) {
            matchingEntry = {
                eventType: eventType,
                callbacks: []
            };
            this.registeredCallbacks.push(matchingEntry);
        }

        matchingEntry.callbacks.push(callback);
    };

    EventDispatcher.prototype.unregisterToEvent = function (eventType, callback) {
        var matchingEntry = this.registeredCallbacks.filter(function (group) {
            return group.eventType === eventType;
        })[0];
        matchingEntry.callbacks = matchingEntry.callbacks.filter(function (existingCallback) {
            return existingCallback !== callback;
        });
    };

    EventDispatcher.prototype.dispatchEvent = function (event) {
        var eventType = event.getEventType();
        var matchingEntry = this.registeredCallbacks.filter(function (group) {
            return group.eventType === eventType;
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
