﻿import Infrastructure = require("./Infrastructure");
import Immutables = require("../Shared/Immutables/Immutables");

export = IEventRepository;
interface IEventRepository {
    getEventsForAggregate(aggregateID: Immutables.Guid): Array<Infrastructure.IEvent>;
    commitEvents(events: Array<Infrastructure.IEvent>):void;
}