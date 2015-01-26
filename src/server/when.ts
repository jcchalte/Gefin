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
            Infrastructure.IEventDispatcher.getInstance().unregisterToEvent(expected.constructor, onEventTriggered);

            if (event.equals(expected)) {
                success = true;
            }
        }
        Infrastructure.IEventDispatcher.getInstance().registerToEvent(expected.constructor, onEventTriggered);

        var commandeDispatcher = Infrastructure.ICommandDispatcher.getInstance();
        commandeDispatcher.dispatchCommand(this.commande);
        
        if(!success)
            fail();
    }
}