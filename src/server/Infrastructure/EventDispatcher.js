var EventDispatcher = (function () {
    function EventDispatcher() {
        this.registeredCallbacks = [];
    }
    EventDispatcher.prototype.registerToEvent = function (eventName, callback) {
        var matchingEntry = this.registeredCallbacks.filter(function (group) {
            return group.eventName.equals(eventName);
        })[0];
        if (matchingEntry == null) {
            matchingEntry = {
                eventName: eventName,
                callbacks: []
            };
            this.registeredCallbacks.push(matchingEntry);
        }

        matchingEntry.callbacks.push(callback);
    };

    EventDispatcher.prototype.unregisterToEvent = function (eventName, callback) {
        var matchingEntry = this.registeredCallbacks.filter(function (group) {
            return group.eventName.equals(eventName);
        })[0];
        matchingEntry.callbacks = matchingEntry.callbacks.filter(function (existingCallback) {
            return existingCallback !== callback;
        });
    };

    EventDispatcher.prototype.dispatchEvent = function (event) {
        var eventName = event.getEventName();
        var matchingEntry = this.registeredCallbacks.filter(function (group) {
            return group.eventName.equals(eventName);
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
