import Infrastructure = require("Infrastructure");
import IEventDispatcher = require("IEventDispatcher");
export = EventDispatcher
class EventDispatcher implements IEventDispatcher {
    private registeredCallbacks: Array<{ eventName: Infrastructure.EventName; callbacks: Array<(event: Infrastructure.IEvent) => void> }>;

    constructor() {
        this.registeredCallbacks = [];
    }
    
    registerToEvent(eventName: Infrastructure.EventName, callback: (event: Infrastructure.IEvent) => void): void {
        var matchingEntry = this.registeredCallbacks.filter((group) => {
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
    }

    unregisterToEvent(eventName: Infrastructure.EventName, callback: (event: Infrastructure.IEvent) => void): void {
        var matchingEntry = this.registeredCallbacks.filter((group) => {
            return group.eventName.equals(eventName);
        })[0];
        matchingEntry.callbacks = matchingEntry.callbacks.filter((existingCallback) => {
            return existingCallback !== callback;
        });
    }

    dispatchEvent(event: Infrastructure.IEvent): void {
        var eventName = event.getEventName();
        var matchingEntry = this.registeredCallbacks.filter((group) => {
            return group.eventName.equals(eventName);
        })[0];
        if (matchingEntry) {
            matchingEntry.callbacks.forEach((callback) => {
                callback(event);
            });
        }
    }
} 