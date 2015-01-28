import EventDispatcher = require("../Infrastructure/__Implementations/EventDispatcher");
import InMemoryEventRepository = require("../Infrastructure/__Implementations/InMemoryEventRepository");
import CommandDispatcher = require("../Infrastructure/__Implementations/CommandDispatcher");
import Infrastructure = require("../Infrastructure/Infrastructure");
import Immutables = require("../Immutables/Immutables");
import TestThat = require("../TestThat");

import NewUserAccountRegistered = require("../Administration/Events/NewUserAccountRegistered");

import MealProposalInitiated = require("./Events/MealProposalInitiated");
import MealProposalInformationsFilled = require("./Events/MealProposalInformationsFilled");
import MealProposalPublished = require("./Events/MealProposalPublished");

import InitiateMealProposal = require("./Commands/InitiateMealProposal");
import FillMealProposalInformations = require("./Commands/FillMealProposalInformations");


import MealProposalSagasRegistration = require("./Sagas/MealProposalSagasRegistration");

describe("Meal proposal >", () => {
    describe("meal proposal creation >", () => {

        var TEST_USER_ID = new Immutables.Guid();

        before((done) => {
            Infrastructure.ServiceInjection.injectServices(new EventDispatcher(), new InMemoryEventRepository(), new CommandDispatcher());

            MealProposalSagasRegistration.registerSagas();

            done();
        });

        it("Initiate meal proposal", (done) => {

            var mealProposalID = new Immutables.Guid();

            var initiateMealProposal = new InitiateMealProposal(mealProposalID, TEST_USER_ID, new Immutables.Title('Pizzicato'), false, '');

            TestThat.given(anExistingUser())
                .when(initiateMealProposal)
                .then(new MealProposalInitiated(mealProposalID, TEST_USER_ID, new Immutables.Title('Pizzicato'), false, ''), done);
        });



        it("Fill remaining meal proposal informations", (done) => {
            var mealProposalID = new Immutables.Guid();
            
            var fillRemainingMealProposalInformations = new FillMealProposalInformations(mealProposalID, new Immutables.Description('a more complete description'), new Immutables.Time(11, 30), new Immutables.Euros(7.90), true);

            TestThat.given(anExistingUser())
                .and(anAlreadyInitiatedMealProposal(mealProposalID, new Immutables.Title('Pizzicato')))
                .when(fillRemainingMealProposalInformations)
                .then(new MealProposalInformationsFilled(mealProposalID, new Immutables.Description('a more complete description'), new Immutables.Time(11, 30), new Immutables.Euros(7.90), true), done);
        });


        it("Publish meal proposal when all informations are filled", (done) => {
            var mealProposalID = new Immutables.Guid();
            var fillRemainingMealProposalInformations = new FillMealProposalInformations(mealProposalID, new Immutables.Description('a more complete description'), new Immutables.Time(11, 30), new Immutables.Euros(7.90), true);

            TestThat.given(anExistingUser())
                .and(anAlreadyInitiatedMealProposal(mealProposalID, new Immutables.Title('Pizzicato')))
                .when(fillRemainingMealProposalInformations)
                .then(new MealProposalPublished(mealProposalID, new Immutables.Title('Pizzicato'), new Immutables.Description('a more complete description'), new Immutables.Time(11, 30), new Immutables.Euros(7.90), true, false, ''), done);
        });

        after((done) => {
            done();
        });

        function anExistingUser(): Infrastructure.IEvent[] {
            return [new NewUserAccountRegistered(TEST_USER_ID, new Immutables.Login("testUser"))];
        };

        function anAlreadyInitiatedMealProposal(mealProposalID: Immutables.Guid, title:Immutables.Title): Infrastructure.IEvent[] {
            return [new MealProposalInitiated(mealProposalID, TEST_USER_ID, title, false, '')];
        };

    });
});