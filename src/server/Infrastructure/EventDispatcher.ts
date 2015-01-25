import Infrastructure = require("./Infrastructure");
import IEventDispatcher = require("./IEventDispatcher");
export = EventDispatcher
class EventDispatcher implements IEventDispatcher {
    private registeredCallbacks: Array<{ eventType: Infrastructure.EventType; callbacks: Array<(event: Infrastructure.IEvent) => void> }>;

    constructor() {
        this.registeredCallbacks = [];
    }

    registerToEvent(eventType: Infrastructure.EventType, callback: (event: Infrastructure.IEvent) => void): void {
        var matchingEntry = this.registeredCallbacks.filter((group) => {
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
    }

    unregisterToEvent(eventType: Infrastructure.EventType, callback: (event: Infrastructure.IEvent) => void): void {
        var matchingEntry = this.registeredCallbacks.filter((group) => {
            return group.eventType === eventType;
        })[0];
        matchingEntry.callbacks = matchingEntry.callbacks.filter((existingCallback) => {
            return existingCallback !== callback;
        });
    }

    dispatchEvent(event: Infrastructure.IEvent): void {
        
        var eventType = event.getEventType();
        var matchingEntry = this.registeredCallbacks.filter((group) => {
            return group.eventType===eventType;
        })[0];
        if (matchingEntry) {
            matchingEntry.callbacks.forEach((callback) => {
                callback(event);
            });
        }
    }
} 