import Infrastructure = require("./Infrastructure/Infrastructure");

export = TestThat;
module TestThat {
    export interface IGivenContext {
        and(events: Infrastructure.IEvent[]): IGivenContext;
        when<TCommand>(command: TCommand): IWhenContext<TCommand>;
    }

    export interface IWhenContext<TCommand> {
        then(expected: Infrastructure.IEvent, done: () => void);
        thenItFails(done: () => void);
    }

    export function given(events: Infrastructure.IEvent[]): IGivenContext {
        return new GivenContext(events);
    }

    export function when<TCommand>(command: Infrastructure.ICommand): IWhenContext<TCommand> {
        return new WhenContext(command);
    }

    class GivenContext implements IGivenContext {
        events: Infrastructure.IEvent[];

        constructor(events: Infrastructure.IEvent[]) {
            this.events = events;
        }

        when<TCommand>(command: Infrastructure.ICommand): IWhenContext<TCommand> {
            Infrastructure.IEventRepository.getInstance().commitEvents(this.events);
            return new WhenContext(command);
        }

        and(events: Infrastructure.IEvent[]): IGivenContext {
            return new GivenContext(this.events.concat(events));
        }
    }

    class WhenContext<TCommand> implements IWhenContext<TCommand> {
        private command: Infrastructure.ICommand;

        constructor(command: Infrastructure.ICommand) {
            this.command = command;
        }

        public then(expected: Infrastructure.IEvent, done: () => void) {

            var success = false;
            var onEventTriggered = (event: Infrastructure.IEvent) => {
                Infrastructure.IEventDispatcher.getInstance().unregisterToEvent(expected.constructor, onEventTriggered);

                if (event.equals(expected)) {
                    success = true;
                }
            }
            Infrastructure.IEventDispatcher.getInstance().registerToEvent(expected.constructor, onEventTriggered);

            var commandDispatcher = Infrastructure.ICommandDispatcher.getInstance();
            commandDispatcher.dispatchCommand(this.command);

            if (!success)
                fail();
            else done();
        }

        public thenItFails(done: () => void) {
            try {
                var commandDispatcher = Infrastructure.ICommandDispatcher.getInstance();
                commandDispatcher.dispatchCommand(this.command);
            } catch (exception) {
                done();
            }
        }
    }

}





