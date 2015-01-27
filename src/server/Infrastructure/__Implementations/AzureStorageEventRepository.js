var AzureStorageEventRepository = (function () {
    function AzureStorageEventRepository() {
    }
    AzureStorageEventRepository.prototype.getEventsForAggregate = function (aggregateId) {
        return this.database.filter(function (item) {
            return item.aggregateId.equals(aggregateId);
        }).map(function (item) {
            return item.event;
        }).slice();
    };
    AzureStorageEventRepository.prototype.commitEvents = function (events) {
        var _this = this;
        events.forEach(function (event) {
            _this.database.push({
                aggregateId: event.getAggregateId(),
                event: event
            });
        });
    };
    return AzureStorageEventRepository;
})();
module.exports = AzureStorageEventRepository;
