import IAggregateRepository = require("./IAggregateRepository");
import Infrastructure = require("./Infrastructure");
import Immutables = require("../Shared/Immutables/Immutables");
import IEventRepository = require("./IEventRepository");
import InMemoryEventRepository = require("./InMemoryEventRepository");
import PropositionRepas = require("../Aggregate/PropositionRepas");
import CompteUtilisateur = require("../Aggregate/CompteUtilisateur");

 export = AggregateRepository
 class AggregateRepository implements IAggregateRepository {
    private eventRepository: IEventRepository;

    constructor() {
        this.eventRepository = new InMemoryEventRepository();
    }

    public getAggregateByID(typeAggregate: Infrastructure.AggregateType, idAggregate: Immutables.Guid): Infrastructure.IAggregate {
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
    }

     commitEvents(aggregate: Infrastructure.IAggregate): void {
         this.eventRepository.commitEvents(aggregate.popEventsToCommit());
     }
 }