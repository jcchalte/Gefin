import Login = require("../Immutables/Utilisateur/Login");
import AggregateBase = require("../../Infrastructure/AggregateBase");
import Infrastructure = require("../../Infrastructure/Infrastructure");
import CompteUtilisateurOuvert = require("../Events/Utilisateurs/CompteUtilisateurOuvert");
import OuvrirCompteUtilisateur = require("../Commandes/Utilisateurs/OuvrirCompteUtilisateur");
import Immutables = require("../../Immutables/Immutables");

export = CompteUtilisateur;

class CompteUtilisateur extends AggregateBase implements Infrastructure.IAggregate {

    private aggregateId: Immutables.Guid;
    private login: Login;

    constructor(aggregateId: Immutables.Guid) {
        super();
        this.aggregateId = aggregateId;
    }

    handleCommande(commande: Infrastructure.ICommande) {
        switch (commande.getCommandType()) {
            case Infrastructure.CommandeType.OuvrirCompteUtilisateur:
                this.handleCommandeOuvrirCompteUtilisateur(<OuvrirCompteUtilisateur>commande);
                break;
        }
    }

    private handleCommandeOuvrirCompteUtilisateur(commande: OuvrirCompteUtilisateur) {
        this.addEvent(new CompteUtilisateurOuvert(commande.getAggregateId(), commande.nomUtilisateur));
    }

    handleEvent(event: Infrastructure.IEvent) {
        switch (event.getEventType()) {
            case Infrastructure.EventType.CompteUtilisateurOuvert:
                this.handleEventCompteUtilisateurOuvert(<CompteUtilisateurOuvert>event);
                break;
        }
    }

    private handleEventCompteUtilisateurOuvert(event: CompteUtilisateurOuvert) {
        this.login = event.nomUtilisateur;
    }
}