import IEventDispatcher = require("./IEventDispatcher");
import Infrastructure = require("./Infrastructure");
import Immutables = require("../Shared/Immutables/Immutables");
import IEventRepository = require("./IEventRepository");
export = InMemoryEventRepository
class InMemoryEventRepository implements IEventRepository {
    private database : Array<IEventLine>;

    constructor() {
        this.database = [];
    }

    getEventsForAggregate(aggregateId: Immutables.Guid): Infrastructure.IEvent[] {
        return this.database.filter((item) => {
            return item.aggregateId.equals(aggregateId);
        }).map((item) => {
            return item.event;
        }).slice();
    }

    commitEvents(events: Infrastructure.IEvent[]): void {
        events.forEach((event) => {
            this.database.push({
                aggregateId: event.getAggregateId(),
                event: event
            });
        });

        events.forEach((event) => {
            IEventDispatcher.GetInstance().dispatchEvent(event);
        });
    }
}

interface IEventLine {
    aggregateId: Immutables.Guid;
    event: Infrastructure.IEvent;
}