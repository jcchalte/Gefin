import EventDispatcher = require("./EventDispatcher");
import Infrastructure = require("./Infrastructure");

export = IEventDispatcher
interface IEventDispatcher {
    registerToEvent(eventName: Infrastructure.EventType, callback: (event: Infrastructure.IEvent) => void): void;

    unregisterToEvent(eventName: Infrastructure.EventType, callback: (event: Infrastructure.IEvent) => void): void;

    dispatchEvent(event:Infrastructure.IEvent):void;
}

// ReSharper disable once InconsistentNaming
module IEventDispatcher {
    var instance = new EventDispatcher();

    export function getInstance(): IEventDispatcher {
        return instance;
    }
}