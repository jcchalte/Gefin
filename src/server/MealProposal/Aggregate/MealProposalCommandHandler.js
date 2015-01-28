var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Infrastructure = require("../../Infrastructure/Infrastructure");
var MealProposalInitiated = require("../Events/MealProposalInitiated");
var MealProposalInformationsFilled = require("../Events/MealProposalInformationsFilled");
var MealProposalPublished = require("../Events/MealProposalPublished");
var MealProposalCommandHandler;
(function (MealProposalCommandHandler) {
    function handleCommandInitiateMealProposal(command) {
        Infrastructure.commitEvents([
            new MealProposalInitiated(command.mealProposalID(), command.userAccountID(), command.title(), command.isPrivate(), command.invites())
        ]);
    }
    MealProposalCommandHandler.handleCommandInitiateMealProposal = handleCommandInitiateMealProposal;
    function handleCommandFillMealProposalInformations(command) {
        Infrastructure.commitEvents([new MealProposalInformationsFilled(command.mealProposalID(), command.description(), command.lastReservationTime(), command.foretoldPrice(), command.priceIncludeDelivery())]);
    }
    MealProposalCommandHandler.handleCommandFillMealProposalInformations = handleCommandFillMealProposalInformations;
    function handleCommandPublishMealProposal(command) {
        var propositionRepasID = command.getAggregateId();
        var events = Infrastructure.IEventRepository.getInstance().getEventsForAggregate(propositionRepasID);
        var state = new MealProposalState(events);
        Infrastructure.commitEvents([new MealProposalPublished(state.mealProposalID(), state.title(), state.description(), state.lastReservationTime(), state.foretoldPrice(), state.priceIncludeDelivery(), state.isPrivate(), state.invites())]);
    }
    MealProposalCommandHandler.handleCommandPublishMealProposal = handleCommandPublishMealProposal;
})(MealProposalCommandHandler || (MealProposalCommandHandler = {}));
var MealProposalState = (function (_super) {
    __extends(MealProposalState, _super);
    function MealProposalState(events) {
        var _this = this;
        _super.call(this);
        events.forEach(function (event) {
            _this.callHandleEventDynamically(event);
        });
    }
    MealProposalState.prototype.handleEventMealProposalInitiated = function (event) {
        this.mealProposalID = event.mealProposalID;
        this.title = event.title;
        this.invites = event.invites;
        this.isPrivate = event.isPrivate;
    };
    MealProposalState.prototype.handleEventMealProposalInformationsFilled = function (event) {
        this.description = event.description;
        this.lastReservationTime = event.lastReservationTime;
        this.foretoldPrice = event.foretoldPrice;
        this.priceIncludeDelivery = event.priceIncludeDelivery;
    };
    return MealProposalState;
})(Infrastructure.StateBase);
module.exports = MealProposalCommandHandler;
