import Infrastructure = require("../Infrastructure");
import Immutables = require("../../Immutables/Immutables");

export = AzureStorageEventRepository
class AzureStorageEventRepository implements Infrastructure.IEventRepository {
    private database : Array<IEventLine>;

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
    }
}

interface IEventLine {
    aggregateId: Immutables.Guid;
    event: Infrastructure.IEvent;
}