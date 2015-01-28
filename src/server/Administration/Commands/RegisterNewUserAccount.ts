import ro = require("../../ReadOnly");
import Infrastructure = require("../../Infrastructure/Infrastructure");
import Immutables = require("../../Immutables/Immutables");

export = RegisterNewUserAccount
class RegisterNewUserAccount implements Infrastructure.ICommand {

    public userAccountID: ro.Field<Immutables.Guid>;

    public userLogin: ro.Field<Immutables.Login>;

    constructor(userAccountID: Immutables.Guid, userLogin: Immutables.Login) {
        this.userAccountID =ro.field(userAccountID);
        this.userLogin = ro.field(userLogin);
    }


    public getAggregateId() {
        return this.userAccountID();
    }

    getAssociatedAggregateType(): Infrastructure.Referentiel.AggregateType {
        return Infrastructure.Referentiel.AggregateType.UserAccount;
    }
}