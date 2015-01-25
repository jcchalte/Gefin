import PropositionRepas = require("../Aggregate/PropositionRepas");
import PublierPropositionRepas = require("../Commandes/PropositionRepas/PublierPropositionRepas");
import IAggregateRepository = require("../../Infrastructure/IAggregateRepository");
import IEventDispatcher = require("../../Infrastructure/IEventDispatcher");
import Infrastructure = require("../../Infrastructure/Infrastructure");
import CommandDispatcher = require("../../Infrastructure/CommandDispatcher");

(() => {
    IEventDispatcher.getInstance().registerToEvent(Infrastructure.EventType.InformationsSecondairesPropositionRepasRenseignees, (event) => {
        var propositionRepas = <PropositionRepas>IAggregateRepository.getInstance().getAggregateById(Infrastructure.AggregateType.PropositionRepas, event.getAggregateId());

        var publierPropositionRepas = new PublierPropositionRepas(propositionRepas.getId());

        var commandeDispatcher = new CommandDispatcher();
        commandeDispatcher.dispatchCommand(publierPropositionRepas);
    });
})();