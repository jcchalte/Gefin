import EventDispatcher = require("./EventDispatcher");
import Infrastructure = require("./Infrastructure");

export = IEventDispatcher
interface IEventDispatcher {
    registerToEvent(eventName: Infrastructure.EventName, callback: (event: Infrastructure.IEvent) => void): void;

    unregisterToEvent(eventName: Infrastructure.EventName, callback: (event: Infrastructure.IEvent) => void): void;

    dispatchEvent(event:Infrastructure.IEvent):void;
}

module IEventDispatcher {
    var instance = new EventDispatcher();

    export function GetInstance(): IEventDispatcher {
        return instance;
    }
}