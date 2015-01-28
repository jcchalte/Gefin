import Infrastructure = require("../../Infrastructure/Infrastructure");
import Immutables = require("../../Immutables/Immutables");
import ro = require("../../ReadOnly");

export = PublishMealProposal
class PublishMealProposal implements Infrastructure.ICommand{

    public mealProposalID: ro.Field<Immutables.Guid>;
    
    constructor(mealProposalID: Immutables.Guid) {
        this.mealProposalID = ro.field(mealProposalID);
    }

    public getAggregateId() {
        return this.mealProposalID();
    }

    getAssociatedAggregateType(): Infrastructure.Referentiel.AggregateType {
        return Infrastructure.Referentiel.AggregateType.MealProposal;
    }
}