import AggregateRepository = require("./AggregateRepository");
import Infrastructure = require("./Infrastructure");
 import Immutables = require("../Immutables/Immutables");

 export = IAggregateRepository
 interface IAggregateRepository {
     getAggregateById(typeAggregate: Infrastructure.AggregateType, idAggregate: Immutables.Guid): Infrastructure.IAggregate;

     commitEvents(aggregate:Infrastructure.IAggregate):void;
 }

// ReSharper disable once InconsistentNaming
module IAggregateRepository {
    var aggregateRepository = new AggregateRepository();

    export function getInstance(): IAggregateRepository {
        return aggregateRepository;
    }
}