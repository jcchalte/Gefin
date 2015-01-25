import IEvent = require("../Events/Base/IEvent");
import Guid = require("../Shared/Immutables/Guid");

export = IEventRepository;
interface IEventRepository {
    getEventsForAggregate(aggregateID: Guid): Array<IEvent>;
    commitEvents(events:Array<IEvent>):void;
}