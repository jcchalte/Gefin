var ro = require("../../ReadOnly");
var Infrastructure = require("../../Infrastructure/Infrastructure");
var AggregateType = Infrastructure.Referentiel.AggregateType;
var NewUserAccountRegistered = (function () {
    function NewUserAccountRegistered(userAccountID, userLogin) {
        this.userAccountID = ro.field(userAccountID);
        this.userLogin = ro.field(userLogin);
    }
    NewUserAccountRegistered.prototype.equals = function (left) {
        return this.userAccountID.equals(left.userAccountID) && this.userLogin.equals(left.userLogin);
    };
    NewUserAccountRegistered.prototype.getAggregateId = function () {
        return this.userAccountID();
    };
    NewUserAccountRegistered.prototype.getAggregateType = function () {
        return 0 /* UserAccount */;
    };
    return NewUserAccountRegistered;
})();
module.exports = NewUserAccountRegistered;
