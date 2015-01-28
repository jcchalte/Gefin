import Infrastructure = require("../Infrastructure");
import MealProposalCommandHandler = require("../../MealProposal/Aggregate/MealProposalCommandHandler");
import UserAccountCommandHandler = require("../../Administration/Aggregate/UserAccountCommandHandler");

export = CommandDispatcher
class CommandDispatcher implements Infrastructure.ICommandDispatcher {

    public dispatchCommand(command: Infrastructure.ICommand): void {

        var aggregateType = command.getAssociatedAggregateType();

        var commandHandlerThatManageThisAggregateType: any;
        switch (aggregateType) {
            case Infrastructure.Referentiel.AggregateType.MealProposal:
                commandHandlerThatManageThisAggregateType = MealProposalCommandHandler;
                break;
            case Infrastructure.Referentiel.AggregateType.UserAccount:
                commandHandlerThatManageThisAggregateType = UserAccountCommandHandler;
                break;
            default:
                throw new Error("NotImplementedException");
        }

        var handleCommandMethodName= "handleCommand" + (<any>command.constructor).name;

        if (commandHandlerThatManageThisAggregateType[handleCommandMethodName] == null || typeof commandHandlerThatManageThisAggregateType[handleCommandMethodName] !== "function")
            throw new Error("The command handler module " + commandHandlerThatManageThisAggregateType.constructor.name + " does not implement the method " + handleCommandMethodName);
        commandHandlerThatManageThisAggregateType[handleCommandMethodName].call(this, command);
    }



}