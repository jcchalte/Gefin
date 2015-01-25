import Infrastructure = require("../Infrastructure/Infrastructure");
import CompteUtilisateurOuvert = require("../Events/Utilisateurs/CompteUtilisateurOuvert");
import Login = require("../Shared/Immutables/Utilisateur/Login");
import OuvrirCompteUtilisateur = require("../Commandes/Utilisateurs/OuvrirCompteUtilisateur");
import Immutables = require("../Shared/Immutables/Immutables");

export = CompteUtilisateur;

class CompteUtilisateur extends Infrastructure.AggregateBase implements Infrastructure.IAggregate {

    private aggregateId: Immutables.Guid;
    private login: Login;

    constructor(aggregateId: Immutables.Guid) {
        super();
        this.aggregateId = aggregateId;
    }

    handleCommande(commande: Infrastructure.ICommande) {
        if (commande instanceof <any>OuvrirCompteUtilisateur.constructor) {
            var commandeTypee = (<OuvrirCompteUtilisateur>commande);
            this.addEvent(new CompteUtilisateurOuvert(commandeTypee.getAggregateId(), commandeTypee.getNomUtilisateur()));
        }
    }

    handleEvent(event: Infrastructure.IEvent) {
        if (event instanceof <any>CompteUtilisateurOuvert.constructor) {
            var eventTypee = (<CompteUtilisateurOuvert>event);
            this.login = eventTypee.getNomUtilisateur();
        }
    }
}