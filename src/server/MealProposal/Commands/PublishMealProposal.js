var Infrastructure = require("../../Infrastructure/Infrastructure");
var ro = require("../../ReadOnly");
var PublishMealProposal = (function () {
    function PublishMealProposal(mealProposalID) {
        this.mealProposalID = ro.field(mealProposalID);
    }
    PublishMealProposal.prototype.getAggregateId = function () {
        return this.mealProposalID();
    };
    PublishMealProposal.prototype.getAssociatedAggregateType = function () {
        return 1 /* MealProposal */;
    };
    return PublishMealProposal;
})();
module.exports = PublishMealProposal;
