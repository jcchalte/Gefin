var IEventDispatcher = require("./IEventDispatcher");

var InMemoryEventRepository = (function () {
    function InMemoryEventRepository() {
        this.database = [];
    }
    InMemoryEventRepository.prototype.getEventsForAggregate = function (aggregateId) {
        return this.database.filter(function (item) {
            return item.aggregateId.equals(aggregateId);
        }).map(function (item) {
            return item.event;
        }).slice();
    };

    InMemoryEventRepository.prototype.commitEvents = function (events) {
        var _this = this;
        events.forEach(function (event) {
            _this.database.push({
                aggregateId: event.getAggregateId(),
                event: event
            });
        });

        events.forEach(function (event) {
            IEventDispatcher.GetInstance().dispatchEvent(event);
        });
    };
    return InMemoryEventRepository;
})();
module.exports = InMemoryEventRepository;
