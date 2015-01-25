/// <reference path="../../../../Scripts/GlobalReferences.d.ts"/>
import Guid = require("../../Shared/Immutables/Guid");
export = IEvent
interface IEvent {
    getAggregateId():Guid;
    equals(left:IEvent):boolean;
}