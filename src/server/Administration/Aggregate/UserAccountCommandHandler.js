var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Infrastructure = require("../../Infrastructure/Infrastructure");
var NewUserAccountRegistered = require("../Events/NewUserAccountRegistered");
var ro = require("../../ReadOnly");
var UserAccountCommandHandler;
(function (UserAccountCommandHandler) {
    function handleCommandRegisterNewUserAccount(command) {
        var userID = command.getAggregateId();
        var events = Infrastructure.IEventRepository.getInstance().getEventsForAggregate(userID);
        var state = new UserAccountState(events);
        if (state.isActive()) {
            throw new Error("The user " + command.userLogin().value() + " is already opened");
        }
        Infrastructure.commitEvents([new NewUserAccountRegistered(command.getAggregateId(), command.userLogin())]);
    }
    UserAccountCommandHandler.handleCommandRegisterNewUserAccount = handleCommandRegisterNewUserAccount;
})(UserAccountCommandHandler || (UserAccountCommandHandler = {}));
var UserAccountState = (function (_super) {
    __extends(UserAccountState, _super);
    function UserAccountState(events) {
        var _this = this;
        this.isActive = ro.field(false);
        _super.call(this);
        events.forEach(function (event) {
            _this.callHandleEventDynamically(event);
        });
    }
    UserAccountState.prototype.handleEventNewUserAccountRegistered = function (event) {
        this.isActive = ro.field(true);
    };
    return UserAccountState;
})(Infrastructure.StateBase);
module.exports = UserAccountCommandHandler;
