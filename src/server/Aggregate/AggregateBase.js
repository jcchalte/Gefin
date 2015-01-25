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
module.exports = AggregateBase;
