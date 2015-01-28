var Infrastructure = require("../../Infrastructure/Infrastructure");
var ro = require("../../ReadOnly");
var MealProposalInitiated = (function () {
    function MealProposalInitiated(mealProposalID, userAccountID, title, isPrivate, invites) {
        this.mealProposalID = ro.field(mealProposalID);
        this.userAccountID = ro.field(userAccountID);
        this.title = ro.field(title);
        this.invites = ro.field(invites);
        this.isPrivate = ro.field(isPrivate);
    }
    MealProposalInitiated.prototype.equals = function (left) {
        return this.mealProposalID.equals(left.mealProposalID) && this.userAccountID.equals(left.userAccountID) && this.title.equals(left.title) && this.invites.equals(left.invites) && this.isPrivate.equals(left.isPrivate);
    };
    MealProposalInitiated.prototype.getAggregateId = function () {
        return this.mealProposalID();
    };
    MealProposalInitiated.prototype.getAggregateType = function () {
        return 1 /* MealProposal */;
    };
    return MealProposalInitiated;
})();
module.exports = MealProposalInitiated;
