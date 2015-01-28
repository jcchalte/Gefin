import Infrastructure = require("../../Infrastructure/Infrastructure");
import NewUserAccountRegistered = require("../Events/NewUserAccountRegistered");
import RegisterNewUserAccount = require("../Commands/RegisterNewUserAccount");
import ro = require("../../ReadOnly");

export = UserAccountCommandHandler;
module UserAccountCommandHandler {

    export function handleCommandRegisterNewUserAccount(command: RegisterNewUserAccount) {
        if (command.userLogin() === null)
            throw new Error("The login is required");

        var userID = command.getAggregateId();
        var events = Infrastructure.IEventRepository.getInstance().getEventsForAggregate(userID);
        var state = new UserAccountState(events);
        
        if (state.isActive()) {
            throw new Error(`The user ${command.userLogin().value()} is already opened`);
        }

        Infrastructure.commitEvents([new NewUserAccountRegistered(command.getAggregateId(), command.userLogin())]);
    }
}

class UserAccountState extends Infrastructure.StateBase {
    public isActive: ro.Field<boolean>;

    constructor(events: Infrastructure.IEvent[]) {
        this.isActive = ro.field(false);

        super();
        events.forEach((event) => {
            this.callHandleEventDynamically(event);
        });
    }

    private handleEventNewUserAccountRegistered(event: NewUserAccountRegistered) {
        this.isActive = ro.field(true);
    }
}