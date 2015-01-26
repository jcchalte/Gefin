var InformationsSecondairesPropositionRepasRenseignees = require("../Events/PropositionRepas/InformationsSecondairesPropositionRepasRenseignees");
var PublierPropositionRepas = require("../Commandes/PropositionRepas/PublierPropositionRepas");
var Infrastructure = require("../../Infrastructure/Infrastructure");

(function () {
    Infrastructure.IEventDispatcher.getInstance().registerToEvent(InformationsSecondairesPropositionRepasRenseignees, function (event) {
        var publierPropositionRepas = new PublierPropositionRepas(event.getAggregateId());
        var commandeDispatcher = Infrastructure.ICommandDispatcher.getInstance();
        commandeDispatcher.dispatchCommand(publierPropositionRepas);
    });
})();
