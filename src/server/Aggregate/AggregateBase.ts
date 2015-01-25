import IEvent = require("../Events/Base/IEvent");
export = AggregateBase
class AggregateBase {
    private eventsToCommit:Array<IEvent>;

    constructor() {
        this.eventsToCommit = [];
    }

    public addEvent(event: IEvent) {
        this.eventsToCommit.push(event);
    }

    public popEventsToCommit() {
        var resultat = this.eventsToCommit.slice();
        this.eventsToCommit = [];
        return resultat;
    }
}