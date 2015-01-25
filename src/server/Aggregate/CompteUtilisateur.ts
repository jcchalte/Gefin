import AggregateBase = require("./AggregateBase");
import CompteUtilisateurOuvert = require("../Events/Utilisateurs/CompteUtilisateurOuvert");
import Login = require("../Shared/Immutables/Utilisateur/Login");
import OuvrirCompteUtilisateur = require("../Commandes/Utilisateurs/OuvrirCompteUtilisateur");
import Guid = require("../Shared/Immutables/Guid");
import IEvent = require("../Events/Base/IEvent");
import ICommande = require("../Commandes/Base/ICommande");
import IAggregate = require("../Infrastructure/IAggregate");
export = CompteUtilisateur;

class CompteUtilisateur extends AggregateBase implements IAggregate {

    private aggregateId: Guid;
    private login: Login;

    constructor(aggregateId: Guid) {
        super();
        this.aggregateId = aggregateId;
    }

    handleCommande(commande: ICommande) {
        if (commande instanceof <any>OuvrirCompteUtilisateur.constructor) {
            var commandeTypee = (<OuvrirCompteUtilisateur>commande);
            this.addEvent(new CompteUtilisateurOuvert(commandeTypee.getAggregateId(), commandeTypee.getNomUtilisateur()));
        }
    }

    handleEvent(event: IEvent) {
        if (event instanceof <any>CompteUtilisateurOuvert.constructor) {
            var eventTypee = (<CompteUtilisateurOuvert>event);
            this.login = eventTypee.getNomUtilisateur();
        }
    }
}