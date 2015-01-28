import Infrastructure = require("../../Infrastructure/Infrastructure");
import Immutables = require("../../Immutables/Immutables");
import ro = require("../../ReadOnly");

export = MealProposalInitiated
class MealProposalInitiated implements Infrastructure.IEvent {

    public mealProposalID: ro.Field<Immutables.Guid>;
    public userAccountID: ro.Field<Immutables.Guid>;
    public title: ro.Field<Immutables.Title>;
    public invites: ro.Field<string>;
    public isPrivate: ro.Field<boolean>;

    constructor(mealProposalID: Immutables.Guid, userAccountID: Immutables.Guid, title: Immutables.Title, isPrivate: boolean, invites: string) {
        this.mealProposalID = ro.field(mealProposalID);
        this.userAccountID = ro.field(userAccountID);
        this.title = ro.field(title);
        this.invites = ro.field(invites);
        this.isPrivate = ro.field(isPrivate);
    }


    equals(left: MealProposalInitiated): boolean {
        return this.mealProposalID.equals(left.mealProposalID)
            && this.userAccountID.equals(left.userAccountID)
            && this.title.equals(left.title)
            && this.invites.equals(left.invites)
            && this.isPrivate.equals(left.isPrivate);
    }

    getAggregateId(): Immutables.Guid { return this.mealProposalID(); }

    getAggregateType(): Infrastructure.Referentiel.AggregateType { return Infrastructure.Referentiel.AggregateType.MealProposal; }
}