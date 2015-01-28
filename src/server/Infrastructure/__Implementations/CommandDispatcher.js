var Infrastructure = require("../Infrastructure");
var MealProposalCommandHandler = require("../../MealProposal/Aggregate/MealProposalCommandHandler");
var UserAccountCommandHandler = require("../../Administration/Aggregate/UserAccountCommandHandler");
var CommandDispatcher = (function () {
    function CommandDispatcher() {
    }
    CommandDispatcher.prototype.dispatchCommand = function (command) {
        var aggregateType = command.getAssociatedAggregateType();
        var commandHandlerThatManageThisAggregateType;
        switch (aggregateType) {
            case 1 /* MealProposal */:
                commandHandlerThatManageThisAggregateType = MealProposalCommandHandler;
                break;
            case 0 /* UserAccount */:
                commandHandlerThatManageThisAggregateType = UserAccountCommandHandler;
                break;
            default:
                throw new Error("NotImplementedException");
        }
        var handleCommandMethodName = "handleCommand" + command.constructor.name;
        if (commandHandlerThatManageThisAggregateType[handleCommandMethodName] == null || typeof commandHandlerThatManageThisAggregateType[handleCommandMethodName] !== "function")
            throw new Error("The command handler module " + commandHandlerThatManageThisAggregateType.constructor.name + " does not implement the method " + handleCommandMethodName);
        commandHandlerThatManageThisAggregateType[handleCommandMethodName].call(this, command);
    };
    return CommandDispatcher;
})();
module.exports = CommandDispatcher;
