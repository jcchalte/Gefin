var PublierPropositionRepas = require("../Commandes/PropositionRepas/PublierPropositionRepas");
var IAggregateRepository = require("../../Infrastructure/IAggregateRepository");
var IEventDispatcher = require("../../Infrastructure/IEventDispatcher");
var Infrastructure = require("../../Infrastructure/Infrastructure");
var CommandDispatcher = require("../../Infrastructure/CommandDispatcher");

(function () {
    IEventDispatcher.getInstance().registerToEvent(2 /* InformationsSecondairesPropositionRepasRenseignees */, function (event) {
        var propositionRepas = IAggregateRepository.getInstance().getAggregateByID(1 /* PropositionRepas */, event.getAggregateId());

        var publierPropositionRepas = new PublierPropositionRepas(propositionRepas.getId());

        var commandeDispatcher = new CommandDispatcher();
        commandeDispatcher.dispatchCommand(publierPropositionRepas);
    });
})();
