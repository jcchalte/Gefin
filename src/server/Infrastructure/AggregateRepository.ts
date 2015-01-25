import IAggregateRepository = require("./IAggregateRepository");
import Infrastructure = require("./Infrastructure");
import Immutables = require("../Immutables/Immutables");
import IEventRepository = require("./IEventRepository");
import InMemoryEventRepository = require("./InMemoryEventRepository");
import PropositionRepas = require("../Repas/Aggregate/PropositionRepas");
import CompteUtilisateur = require("../Administration/Aggregate/CompteUtilisateur");

 export = AggregateRepository
 class AggregateRepository implements IAggregateRepository {
    private eventRepository: IEventRepository;

    constructor() {
        this.eventRepository = new InMemoryEventRepository();
    }

    public getAggregateById(typeAggregate: Infrastructure.AggregateType, idAggregate: Immutables.Guid): Infrastructure.IAggregate {
        var events = this.eventRepository.getEventsForAggregate(idAggregate);
        var aggregate = this.getAggregateCorrespondingToCommande(typeAggregate, idAggregate);
        events.forEach((event) => {
            aggregate.handleEvent(event);
        });

        return aggregate;
    }

    private getAggregateCorrespondingToCommande(typeAggregate: Infrastructure.AggregateType, idAggregate:Immutables.Guid): Infrastructure.IAggregate {
        switch (typeAggregate) {
            case Infrastructure.AggregateType.CompteUtilisateur:
                return new CompteUtilisateur(idAggregate);
            case Infrastructure.AggregateType.PropositionRepas:
                return new PropositionRepas(idAggregate);
        };
        throw new Error("AggregateRepository > getAggregateCorrespondingToCommande > Type non géré");
    }

     commitEvents(aggregate: Infrastructure.IAggregate): void {
         this.eventRepository.commitEvents(aggregate.popEventsToCommit());
     }
 }