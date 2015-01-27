import Infrastructure = require("../../Infrastructure/Infrastructure");
import CompteUtilisateurOuvert = require("../Events/Utilisateurs/CompteUtilisateurOuvert");
import OuvrirCompteUtilisateur = require("../Commandes/Utilisateurs/OuvrirCompteUtilisateur");
import ro = require("../../ReadOnly");

export = CompteUtilisateur;
module CompteUtilisateur {


    export function handleCommandeOuvrirCompteUtilisateur(commande: OuvrirCompteUtilisateur) {
        var utilisateurID = commande.getAggregateId();
        var events = Infrastructure.IEventRepository.getInstance().getEventsForAggregate(utilisateurID);
        var state = new CompteUtilisateurState(events);

        if (state.isActive()) {
            throw new Error(`The user ${commande.nomUtilisateur().value()} is already opened`);
        }
        Infrastructure.commitEvents([new CompteUtilisateurOuvert(commande.getAggregateId(), commande.nomUtilisateur())]);
    }
}

class CompteUtilisateurState extends Infrastructure.StateBase {
    public isActive: ro.Field<boolean>;

    constructor(events: Infrastructure.IEvent[]) {
        this.isActive = ro.field(false);

        super();
        events.forEach((event) => {
            this.callHandleEventDynamically(event);
        });
    }

    private handleEventCompteUtilisateurOuvert(event: CompteUtilisateurOuvert) {
        this.isActive = ro.field(true);
    }
}