import Infrastructure = require("../Infrastructure");

export = EventDispatcher
class EventDispatcher implements Infrastructure.IEventDispatcher {
    private registeredCallbacks: Array<{ eventConstructor: Function; callbacks: Array<(event: Infrastructure.IEvent) => void> }>;

    constructor() {
        this.registeredCallbacks = [];
    }

    registerToEvent(eventConstructor: Function, callback: (event: Infrastructure.IEvent) => void): void {
        var matchingEntry = this.registeredCallbacks.filter((group) => {
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
    }

    unregisterToEvent(eventConstructor: Function, callback: (event: Infrastructure.IEvent) => void): void {
        var matchingEntry = this.registeredCallbacks.filter((group) => {
            return group.eventConstructor === eventConstructor;
        })[0];
        matchingEntry.callbacks = matchingEntry.callbacks.filter((existingCallback) => {
            return existingCallback !== callback;
        });
    }

    dispatchEvent(event: Infrastructure.IEvent): void {
        
        var eventConstructor = event.constructor;
        var matchingEntry = this.registeredCallbacks.filter((group) => {
            return group.eventConstructor === eventConstructor;
        })[0];
        if (matchingEntry) {
            matchingEntry.callbacks.forEach((callback) => {
                callback(event);
            });
        }
    }
} 