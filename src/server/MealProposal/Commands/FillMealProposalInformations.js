var Infrastructure = require("../../Infrastructure/Infrastructure");
var ro = require("../../ReadOnly");
var FillMealProposalInformations = (function () {
    function FillMealProposalInformations(mealProposalID, description, lastReservationTime, foretoldPrice, priceIncludeDelivery) {
        this.mealProposalID = ro.field(mealProposalID);
        this.description = ro.field(description);
        this.lastReservationTime = ro.field(lastReservationTime);
        this.foretoldPrice = ro.field(foretoldPrice);
        this.priceIncludeDelivery = ro.field(priceIncludeDelivery);
    }
    FillMealProposalInformations.prototype.getAggregateId = function () {
        return this.mealProposalID;
    };
    FillMealProposalInformations.prototype.getAssociatedAggregateType = function () {
        return 1 /* MealProposal */;
    };
    return FillMealProposalInformations;
})();
module.exports = FillMealProposalInformations;
