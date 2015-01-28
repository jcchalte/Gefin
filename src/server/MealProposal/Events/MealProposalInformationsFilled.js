var Infrastructure = require("../../Infrastructure/Infrastructure");
var ro = require("../../ReadOnly");
var MealProposalInformationsFilled = (function () {
    function MealProposalInformationsFilled(mealProposalID, description, lastReservationTime, foretoldPrice, priceIncludeDelivery) {
        this.mealProposalID = ro.field(mealProposalID);
        this.description = ro.field(description);
        this.lastReservationTime = ro.field(lastReservationTime);
        this.foretoldPrice = ro.field(foretoldPrice);
        this.priceIncludeDelivery = ro.field(priceIncludeDelivery);
    }
    MealProposalInformationsFilled.prototype.equals = function (left) {
        return this.mealProposalID.equals(left.mealProposalID) && this.description.equals(left.description) && this.lastReservationTime.equals(left.lastReservationTime) && this.foretoldPrice.equals(left.foretoldPrice) && this.priceIncludeDelivery.equals(left.priceIncludeDelivery);
    };
    MealProposalInformationsFilled.prototype.getAggregateId = function () {
        return this.mealProposalID();
    };
    MealProposalInformationsFilled.prototype.getAggregateType = function () {
        return 1 /* MealProposal */;
    };
    return MealProposalInformationsFilled;
})();
module.exports = MealProposalInformationsFilled;
