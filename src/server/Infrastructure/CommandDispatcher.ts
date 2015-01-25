import IAggregateRepository = require("./IAggregateRepository");
import Infrastructure = require("./Infrastructure");
export = CommandDispatcher;

class CommandDispatcher {
   

    public dispatchCommand<TAggregate>(commande: Infrastructure.ICommande): void {

        //1. Charger depuis un repository d'event ou créer l'aggrégat correspondant à la commande
        //2. Appeler la méthode "Handle" correspondant à la commande
        //      - Cette méthode regarde par rapport à ses projections si la commande est envisageable
        //      - En fonction de ses projections, elle rajoute des events dans la liste d'event à publier
        //3. On "Sauvegarde" les évènements à publier, c'est à dire qu'on va trigger tous les handlers et qu'on sauvegarde dans un repository   
        var aggregate = IAggregateRepository.getInstance().getAggregateByID(commande.getAssociatedAggregateType(), commande.getAggregateId());

        aggregate.handleCommande(commande);

        IAggregateRepository.getInstance().commitEvents(aggregate);
    }

    

}