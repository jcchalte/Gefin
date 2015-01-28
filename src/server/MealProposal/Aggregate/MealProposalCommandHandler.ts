import Infrastructure = require("../../Infrastructure/Infrastructure");
import Immutables = require("../../Immutables/Immutables");
import ro = require("../../ReadOnly");


import MealProposalInitiated = require("../Events/MealProposalInitiated");
import MealProposalInformationsFilled = require("../Events/MealProposalInformationsFilled");
import MealProposalPublished = require("../Events/MealProposalPublished");

import InitiateMealProposal = require("../Commands/InitiateMealProposal");
import FillMealProposalInformations = require("../Commands/FillMealProposalInformations");
import PublishMealProposal = require("../Commands/PublishMealProposal");


export = MealProposalCommandHandler;

module MealProposalCommandHandler {


    export function handleCommandInitiateMealProposal(command: InitiateMealProposal) {
        Infrastructure.commitEvents([
            new MealProposalInitiated(command.mealProposalID(),
                command.userAccountID(),
                command.title(),
                command.isPrivate(),
                command.invites())
        ]);
    }

    export function handleCommandFillMealProposalInformations(command: FillMealProposalInformations) {
        Infrastructure.commitEvents([new MealProposalInformationsFilled(command.mealProposalID(),
            command.description(),
            command.lastReservationTime(),
            command.foretoldPrice(),
            command.priceIncludeDelivery())]);
    }

    export function handleCommandPublishMealProposal(command: PublishMealProposal) {
        var propositionRepasID = command.getAggregateId();
        var events = Infrastructure.IEventRepository.getInstance().getEventsForAggregate(propositionRepasID);

        var state = new MealProposalState(events);

        Infrastructure.commitEvents([new MealProposalPublished(state.mealProposalID(),
            state.title(),
            state.description(),
            state.lastReservationTime(),
            state.foretoldPrice(),
            state.priceIncludeDelivery(),
            state.isPrivate(),
            state.invites())]);
    }


}


class MealProposalState extends Infrastructure.StateBase {
    public mealProposalID: ro.Field<Immutables.Guid>;
    public title: ro.Field<Immutables.Title>;
    public description: ro.Field<Immutables.Description>;
    public lastReservationTime: ro.Field<Immutables.Time>;
    public foretoldPrice: ro.Field<Immutables.Euros>;
    public priceIncludeDelivery: ro.Field<boolean>;
    public isPrivate: ro.Field<boolean>;
    public invites: ro.Field<string>;

    constructor(events: Infrastructure.IEvent[]) {
        super();
        events.forEach((event) => {
            this.callHandleEventDynamically(event);
        });
    }

    private handleEventMealProposalInitiated(event: MealProposalInitiated) {
        this.mealProposalID = event.mealProposalID;
        this.title = event.title;
        this.invites = event.invites;
        this.isPrivate = event.isPrivate;
    }

    private handleEventMealProposalInformationsFilled(event: MealProposalInformationsFilled) {
        this.description = event.description;
        this.lastReservationTime = event.lastReservationTime;
        this.foretoldPrice = event.foretoldPrice;
        this.priceIncludeDelivery = event.priceIncludeDelivery;
    }
}

