import Infrastructure = require("../../Infrastructure/Infrastructure");
import Immutables = require("../../Immutables/Immutables");
import ro = require("../../ReadOnly");

export = MealProposalInformationsFilled
class MealProposalInformationsFilled implements Infrastructure.IEvent {

    public mealProposalID: ro.Field<Immutables.Guid>;
    public description: ro.Field<Immutables.Description>;
    public lastReservationTime: ro.Field<Immutables.Time>;
    public foretoldPrice: ro.Field<Immutables.Euros>;
    public priceIncludeDelivery: ro.Field<boolean>;


    constructor(mealProposalID: Immutables.Guid, description: Immutables.Description, lastReservationTime: Immutables.Time, foretoldPrice: Immutables.Euros, priceIncludeDelivery: boolean) {
        this.mealProposalID = ro.field(mealProposalID);
        this.description = ro.field(description);
        this.lastReservationTime = ro.field(lastReservationTime);
        this.foretoldPrice = ro.field(foretoldPrice);
        this.priceIncludeDelivery = ro.field(priceIncludeDelivery);
    }


    equals(left: MealProposalInformationsFilled): boolean {
        return this.mealProposalID.equals(left.mealProposalID)
            && this.description.equals(left.description)
            && this.lastReservationTime.equals(left.lastReservationTime)
            && this.foretoldPrice.equals(left.foretoldPrice)
            && this.priceIncludeDelivery.equals(left.priceIncludeDelivery);
    }

    getAggregateId(): Immutables.Guid { return this.mealProposalID(); }

    getAggregateType(): Infrastructure.Referentiel.AggregateType { return Infrastructure.Referentiel.AggregateType.MealProposal; }
}