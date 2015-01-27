import Infrastructure = require("./Infrastructure/Infrastructure");

export = TestThat;
module TestThat {
    export interface IGivenContext {
        and(events: Infrastructure.IEvent[]): IGivenContext;
        when<TCommande>(commande: TCommande): IWhenContext<TCommande>;
    }

    export interface IWhenContext<TCommande> {
        then(expected: Infrastructure.IEvent, done: () => void);
        thenItFails(done: () => void);
    }

    export function given(events: Infrastructure.IEvent[]): IGivenContext {
        return new GivenContext(events);
    }

    export function when<TCommande>(commande: Infrastructure.ICommande): IWhenContext<TCommande> {
        return new WhenContext(commande);
    }

    class GivenContext implements IGivenContext {
        events: Infrastructure.IEvent[];

        constructor(events: Infrastructure.IEvent[]) {
            this.events = events;
        }

        when<TCommande>(commande: Infrastructure.ICommande): IWhenContext<TCommande> {
            Infrastructure.IEventRepository.getInstance().commitEvents(this.events);
            return new WhenContext(commande);
        }

        and(events: Infrastructure.IEvent[]): IGivenContext {
            return new GivenContext(this.events.concat(events));
        }
    }

    class WhenContext<TCommande> implements IWhenContext<TCommande> {
        private commande: Infrastructure.ICommande;

        constructor(commande: Infrastructure.ICommande) {
            this.commande = commande;
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

            var commandeDispatcher = Infrastructure.ICommandDispatcher.getInstance();
            commandeDispatcher.dispatchCommand(this.commande);

            if (!success)
                fail();
            else done();
        }

        public thenItFails(done: () => void) {
            try {
                var commandeDispatcher = Infrastructure.ICommandDispatcher.getInstance();
                commandeDispatcher.dispatchCommand(this.commande);
            } catch (exception) {
                done();
            }
        }
    }

}





