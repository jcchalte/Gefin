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

    public thenExpect(expected) {

        var success = false;
        var commandeDispatcher = new CommandDispatcher();

        commandeDispatcher.dispatchCommand(this.commande);

        if (this.commande instanceof OuvrirCompteUtilisateur) {
            var commandeTypee = (<OuvrirCompteUtilisateur>this.commande);
            var eventGenere = new CompteUtilisateurOuvert(commandeTypee.getIdCompteUtilisateur(), commandeTypee.getNomUtilisateur());

            if (eventGenere.equals(expected)) {
                success = true;
            }
        }
        
        if(!success)
            fail();
    }
}