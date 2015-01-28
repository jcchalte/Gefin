var Infrastructure = require("../../Infrastructure/Infrastructure");
var ro = require("../../ReadOnly");
var MealProposalPublished = (function () {
    function MealProposalPublished(idPropositionRepas, libelle, description, heureMaxReservation, montantMax, livraisonComprise, isPrive, invitations) {
        this.mealProposalID = ro.field(idPropositionRepas);
        this.libelle = ro.field(libelle);
        this.description = ro.field(description);
        this.lastReservationTime = ro.field(heureMaxReservation);
        this.foretoldPrice = ro.field(montantMax);
        this.priceIncludeDelivery = ro.field(livraisonComprise);
        this.isPrivate = ro.field(isPrive);
        this.invites = ro.field(invitations);
    }
    MealProposalPublished.prototype.equals = function (left) {
        return this.mealProposalID.equals(left.mealProposalID) && this.libelle.equals(left.libelle) && this.description.equals(left.description) && this.lastReservationTime.equals(left.lastReservationTime) && this.foretoldPrice.equals(left.foretoldPrice) && this.priceIncludeDelivery.equals(left.priceIncludeDelivery) && this.isPrivate.equals(left.isPrivate) && this.invites.equals(left.invites);
    };
    MealProposalPublished.prototype.getAggregateId = function () {
        return this.mealProposalID();
    };
    MealProposalPublished.prototype.getAggregateType = function () {
        return 1 /* MealProposal */;
    };
    return MealProposalPublished;
})();
module.exports = MealProposalPublished;
