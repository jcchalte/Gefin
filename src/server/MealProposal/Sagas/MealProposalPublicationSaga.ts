import MealProposalInformationsFilled = require("../Events/MealProposalInformationsFilled");
import PublishMealProposal = require("../Commands/PublishMealProposal");
import Infrastructure = require("../../Infrastructure/Infrastructure");

(() => {

    Infrastructure.IEventDispatcher.getInstance().registerToEvent(MealProposalInformationsFilled, (event) => {
        var publishMealProposal = new PublishMealProposal(event.getAggregateId());

        var commandDispatcher = Infrastructure.ICommandDispatcher.getInstance();
        commandDispatcher.dispatchCommand(publishMealProposal);
    });

})();