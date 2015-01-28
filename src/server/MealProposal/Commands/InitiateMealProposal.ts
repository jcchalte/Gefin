import Infrastructure = require("../../Infrastructure/Infrastructure");
import Immutables = require("../../Immutables/Immutables");
import ro = require("../../ReadOnly");

export = InitiateMealProposal
class InitiateMealProposal implements Infrastructure.ICommand{

    public mealProposalID: ro.Field<Immutables.Guid>;
    public userAccountID: ro.Field<Immutables.Guid>;
    public title: ro.Field<Immutables.Title>;
    public invites: ro.Field<string>;
    public isPrivate: ro.Field<boolean>;
    
    
    constructor(mealProposalID: Immutables.Guid, userAccountID: Immutables.Guid, title: Immutables.Title, isPrivate:boolean, invites:string) {
        this.mealProposalID = ro.field(mealProposalID);
        this.userAccountID = ro.field(userAccountID);
        this.title = ro.field(title);
        this.invites = ro.field(invites);
        this.isPrivate = ro.field(isPrivate);
    }

    public getAggregateId() {
        return this.mealProposalID();
    }

    getAssociatedAggregateType(): Infrastructure.Referentiel.AggregateType {
        return Infrastructure.Referentiel.AggregateType.MealProposal;
    }
}