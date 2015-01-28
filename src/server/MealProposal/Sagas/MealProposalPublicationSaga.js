var MealProposalInformationsFilled = require("../Events/MealProposalInformationsFilled");
var PublishMealProposal = require("../Commands/PublishMealProposal");
var Infrastructure = require("../../Infrastructure/Infrastructure");
(function () {
    Infrastructure.IEventDispatcher.getInstance().registerToEvent(MealProposalInformationsFilled, function (event) {
        var publishMealProposal = new PublishMealProposal(event.getAggregateId());
        var commandDispatcher = Infrastructure.ICommandDispatcher.getInstance();
        commandDispatcher.dispatchCommand(publishMealProposal);
    });
})();
