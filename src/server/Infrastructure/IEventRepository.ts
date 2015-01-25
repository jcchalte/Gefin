import Infrastructure = require("./Infrastructure");
import Immutables = require("../Immutables/Immutables");

export = IEventRepository;
interface IEventRepository {
    getEventsForAggregate(aggregateId: Immutables.Guid): Array<Infrastructure.IEvent>;
    commitEvents(events: Array<Infrastructure.IEvent>):void;
}