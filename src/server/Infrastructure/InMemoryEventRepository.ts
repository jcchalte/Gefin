import IEvent = require("../Events/Base/IEvent");
import Guid = require("../Shared/Immutables/Guid");
import IEventRepository = require("./IEventRepository");
export = InMemoryEventRepository
class InMemoryEventRepository implements IEventRepository {
    private database : Array<IEventLine>;

    constructor() {
        this.database = [];
    }

    getEventsForAggregate(aggregateId: Guid): IEvent[] {
        return this.database.filter((item) => {
            return item.aggregateId.equals(aggregateId);
        }).map((item) => {
            return item.event;
        }).slice();
    }

    commitEvents(events: IEvent[]): void {
        events.forEach((event) => {
            this.database.push({
                aggregateId: event.getAggregateId(),
                event: event
            });
        });
    }
}

interface IEventLine {
    aggregateId : Guid;
    event: IEvent;
}