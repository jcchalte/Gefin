var ro = require("../../ReadOnly");
var Infrastructure = require("../../Infrastructure/Infrastructure");
var RegisterNewUserAccount = (function () {
    function RegisterNewUserAccount(userAccountID, userLogin) {
        this.userAccountID = ro.field(userAccountID);
        this.userLogin = ro.field(userLogin);
    }
    RegisterNewUserAccount.prototype.getAggregateId = function () {
        return this.userAccountID();
    };
    RegisterNewUserAccount.prototype.getAssociatedAggregateType = function () {
        return 0 /* UserAccount */;
    };
    return RegisterNewUserAccount;
})();
module.exports = RegisterNewUserAccount;
