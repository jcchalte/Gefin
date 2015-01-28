var Infrastructure = require("../../Infrastructure/Infrastructure");
var ro = require("../../ReadOnly");
var InitiateMealProposal = (function () {
    function InitiateMealProposal(mealProposalID, userAccountID, title, isPrivate, invites) {
        this.mealProposalID = ro.field(mealProposalID);
        this.userAccountID = ro.field(userAccountID);
        this.title = ro.field(title);
        this.invites = ro.field(invites);
        this.isPrivate = ro.field(isPrivate);
    }
    InitiateMealProposal.prototype.getAggregateId = function () {
        return this.mealProposalID();
    };
    InitiateMealProposal.prototype.getAssociatedAggregateType = function () {
        return 1 /* MealProposal */;
    };
    return InitiateMealProposal;
})();
module.exports = InitiateMealProposal;
