import InformationsSecondairesPropositionRepasRenseignees = require("../Events/PropositionRepas/InformationsSecondairesPropositionRepasRenseignees");
import PublierPropositionRepas = require("../Commandes/PropositionRepas/PublierPropositionRepas");
import Infrastructure = require("../../Infrastructure/Infrastructure");

(() => {

    Infrastructure.IEventDispatcher.getInstance().registerToEvent(InformationsSecondairesPropositionRepasRenseignees, (event) => {
        var publierPropositionRepas = new PublierPropositionRepas(event.getAggregateId());
        var commandeDispatcher = Infrastructure.ICommandDispatcher.getInstance();
        commandeDispatcher.dispatchCommand(publierPropositionRepas);
    });
})();