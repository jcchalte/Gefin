import IEventDispatcher = require("./Infrastructure/IEventDispatcher");
import CommandDispatcher = require("./Infrastructure/CommandDispatcher");

import Infrastructure = require("./Infrastructure/Infrastructure");

export function commande<TCommande>(commande: Infrastructure.ICommande): IThenContext<Infrastructure.ICommande> {
    return new ThenContext(commande);
}

export interface IThenContext<TCommande>{
    thenExpect(expected);
}

export class ThenContext<TCommande> implements IThenContext<TCommande> {
    private commande: Infrastructure.ICommande;

    constructor(commande: Infrastructure.ICommande) {
        this.commande = commande;
    }

    public thenExpect(expected: Infrastructure.IEvent) {

        var success = false;
        var onEventTriggered = (event: Infrastructure.IEvent) => {
            IEventDispatcher.getInstance().unregisterToEvent(expected.getEventType(), onEventTriggered);

            if (event.equals(expected)) {
                success = true;
            }
        }
        IEventDispatcher.getInstance().registerToEvent(expected.getEventType(), onEventTriggered);

        var commandeDispatcher = new CommandDispatcher();
        commandeDispatcher.dispatchCommand(this.commande);
        
        if(!success)
            fail();
    }
}