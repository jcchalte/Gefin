var Infrastructure = require("./Infrastructure");

var InMemoryEventRepository = require("./InMemoryEventRepository");
var PropositionRepas = require("../Repas/Aggregate/PropositionRepas");
var CompteUtilisateur = require("../Administration/Aggregate/CompteUtilisateur");

var AggregateRepository = (function () {
    function AggregateRepository() {
        this.eventRepository = new InMemoryEventRepository();
    }
    AggregateRepository.prototype.getAggregateByID = function (typeAggregate, idAggregate) {
        var events = this.eventRepository.getEventsForAggregate(idAggregate);
        var aggregate = this.getAggregateCorrespondingToCommande(typeAggregate, idAggregate);
        events.forEach(function (event) {
            aggregate.handleEvent(event);
        });

        return aggregate;
    };

    AggregateRepository.prototype.getAggregateCorrespondingToCommande = function (typeAggregate, idAggregate) {
        switch (typeAggregate) {
            case 0 /* CompteUtilisateur */:
                return new CompteUtilisateur(idAggregate);
            case 1 /* PropositionRepas */:
                return new PropositionRepas(idAggregate);
        }
        ;
    };

    AggregateRepository.prototype.commitEvents = function (aggregate) {
        this.eventRepository.commitEvents(aggregate.popEventsToCommit());
    };
    return AggregateRepository;
})();
module.exports = AggregateRepository;
