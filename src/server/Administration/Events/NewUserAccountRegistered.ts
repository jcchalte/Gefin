import ro = require("../../ReadOnly");
import Infrastructure = require("../../Infrastructure/Infrastructure");
import Immutables = require("../../Immutables/Immutables");
import AggregateType = Infrastructure.Referentiel.AggregateType;

export = NewUserAccountRegistered
class NewUserAccountRegistered implements Infrastructure.IEvent {

    public userAccountID: ro.Field<Immutables.Guid>;
    public userLogin: ro.Field<Immutables.Login>;

    constructor(userAccountID: Immutables.Guid, userLogin: Immutables.Login) {
        this.userAccountID = ro.field(userAccountID);
        this.userLogin = ro.field(userLogin);
    }

    equals(left: NewUserAccountRegistered): boolean {
        return this.userAccountID.equals(left.userAccountID)
            && this.userLogin.equals(left.userLogin);
    }

    getAggregateId(): Immutables.Guid { return this.userAccountID(); }

    getAggregateType(): AggregateType { return AggregateType.UserAccount; }
}