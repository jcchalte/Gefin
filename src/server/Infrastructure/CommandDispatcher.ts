import InMemoryEventRepository = require("./InMemoryEventRepository");
import CommandeUtilisateur = require("../Aggregate/CompteUtilisateur");
import OuvrirCompteUtilisateur = require("../Commandes/Utilisateurs/OuvrirCompteUtilisateur");
import IAggregate = require("./IAggregate");
import IEventRepository = require("./IEventRepository");
import ICommande = require("../Commandes/Base/ICommande");
export = CommandDispatcher;

class CommandDispatcher {
    private eventRepository: IEventRepository;

    constructor() {
        this.eventRepository = new InMemoryEventRepository();
    }

    public dispatchCommand<TAggregate>(commande: ICommande): void {
        //1. Charger depuis un repository d'event ou créer l'aggrégat correspondant à la commande
        //2. Appeler la méthode "Handle" correspondant à la commande
        //      - Cette méthode regarde par rapport à ses projections si la commande est envisageable
        //      - En fonction de ses projections, elle rajoute des events dans la liste d'event à publier
        //3. On "Sauvegarde" les évènements à publier, c'est à dire qu'on va trigger tous les handlers et qu'on sauvegarde dans un repository   

        var aggregateId = commande.getAggregateId();
        var events = this.eventRepository.getEventsForAggregate(aggregateId);
        var aggregate = this.getAggregateCorrespondingToCommande(commande);
        events.forEach((event) => {
            aggregate.handleEvent(event);
        });

        aggregate.handleCommande(commande);

        this.eventRepository.commitEvents(aggregate.popEventsToCommit());
    }

    private getAggregateCorrespondingToCommande(commande: ICommande): IAggregate {
        return commande.getAssociatedAggregate();
    }

}