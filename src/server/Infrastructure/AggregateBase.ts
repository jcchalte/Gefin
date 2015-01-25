import Infrastructure = require("./Infrastructure");
import Event = Infrastructure.IEvent;
import Commande = Infrastructure.ICommande;
import CommandDispatcher = require("./CommandDispatcher");

export =AggregateBase
class AggregateBase {
    private eventsToCommit: Array<Infrastructure.IEvent>;

    constructor() {
        this.eventsToCommit = [];
    }

    public addEvent(event: Event) {
        this.eventsToCommit.push(event);
    }

    public popEventsToCommit() {
        var resultat = this.eventsToCommit.slice();
        this.eventsToCommit = [];
        return resultat;
    }

    public addCommande(commande: Commande) {
        var dispatcher = new CommandDispatcher();
        dispatcher.dispatchCommand(commande);
    }
}