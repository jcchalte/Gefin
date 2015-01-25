import IEventDispatcher = require("./Infrastructure/IEventDispatcher");
import OuvrirCompteUtilisateur = require("./Commandes/Utilisateurs/OuvrirCompteUtilisateur");
import CompteUtilisateurOuvert = require("./Events/Utilisateurs/CompteUtilisateurOuvert");
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
        var onEventTriggered = (event: CompteUtilisateurOuvert) => {
            IEventDispatcher.GetInstance().unregisterToEvent(expected.getEventName(), onEventTriggered);
            if (event.equals(expected)) {
                success = true;
            }
        }
        IEventDispatcher.GetInstance().registerToEvent(expected.getEventName(), onEventTriggered);

        var commandeDispatcher = new CommandDispatcher();
        commandeDispatcher.dispatchCommand(this.commande);
        
        if(!success)
            fail();
    }
}