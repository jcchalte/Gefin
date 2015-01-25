var EventName = (function () {
    function EventName(value) {
        this.innerValue = value;
    }
    EventName.prototype.value = function () {
        return this.innerValue;
    };

    EventName.prototype.equals = function (left) {
        return this.value() === left.value();
    };
    return EventName;
})();
exports.EventName = EventName;

var AggregateBase = (function () {
    function AggregateBase() {
        this.eventsToCommit = [];
    }
    AggregateBase.prototype.addEvent = function (event) {
        this.eventsToCommit.push(event);
    };

    AggregateBase.prototype.popEventsToCommit = function () {
        var resultat = this.eventsToCommit.slice();
        this.eventsToCommit = [];
        return resultat;
    };
    return AggregateBase;
})();
exports.AggregateBase = AggregateBase;
