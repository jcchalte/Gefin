
import Immutables = require("../Shared/Immutables/Immutables");

export interface IEvent {
    getEventName(): EventName;
    getAggregateId(): Immutables.Guid;
    equals(left: IEvent): boolean;
}

export class EventName {
    private innerValue: string;

    constructor(value: string) {
        this.innerValue = value;
    }

    public value() {
        return this.innerValue;
    }

    public equals(left: EventName) {
        return this.value() === left.value();
    }
}

export interface IAggregate {
    handleCommande(commande: ICommande);

    handleEvent(event: IEvent);

    popEventsToCommit(): Array<IEvent>;
}

export class AggregateBase {
    private eventsToCommit: Array<IEvent>;

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

export interface ICommande {
    getAggregateId(): Immutables.Guid;

    getAssociatedAggregate(): IAggregate;
}

