import AggregateRepository = require("./AggregateRepository");
import Infrastructure = require("./Infrastructure");
 import Immutables = require("../Shared/Immutables/Immutables");

 export = IAggregateRepository
 interface IAggregateRepository {
     getAggregateByID(typeAggregate: Infrastructure.AggregateType, idAggregate: Immutables.Guid): Infrastructure.IAggregate;

     commitEvents(aggregate:Infrastructure.IAggregate):void;
 }

module IAggregateRepository {
    var aggregateRepository = new AggregateRepository();

    export function getInstance(): IAggregateRepository {
        return aggregateRepository;
    }
}