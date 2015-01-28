var EventDispatcher = require("../Infrastructure/__Implementations/EventDispatcher");
var InMemoryEventRepository = require("../Infrastructure/__Implementations/InMemoryEventRepository");
var CommandDispatcher = require("../Infrastructure/__Implementations/CommandDispatcher");
var Infrastructure = require("../Infrastructure/Infrastructure");
var Immutables = require("../Immutables/Immutables");
var TestThat = require("../TestThat");
var NewUserAccountRegistered = require("../Administration/Events/NewUserAccountRegistered");
var MealProposalInitiated = require("./Events/MealProposalInitiated");
var MealProposalInformationsFilled = require("./Events/MealProposalInformationsFilled");
var MealProposalPublished = require("./Events/MealProposalPublished");
var InitiateMealProposal = require("./Commands/InitiateMealProposal");
var FillMealProposalInformations = require("./Commands/FillMealProposalInformations");
var MealProposalSagasRegistration = require("./Sagas/MealProposalSagasRegistration");
describe("Meal proposal >", function () {
    describe("meal proposal creation >", function () {
        var TEST_USER_ID = new Immutables.Guid();
        before(function (done) {
            Infrastructure.ServiceInjection.injectServices(new EventDispatcher(), new InMemoryEventRepository(), new CommandDispatcher());
            MealProposalSagasRegistration.registerSagas();
            done();
        });
        it("Initiate meal proposal", function (done) {
            var mealProposalID = new Immutables.Guid();
            var initiateMealProposal = new InitiateMealProposal(mealProposalID, TEST_USER_ID, new Immutables.Title('Pizzicato'), false, '');
            TestThat.given(anExistingUser()).when(initiateMealProposal).then(new MealProposalInitiated(mealProposalID, TEST_USER_ID, new Immutables.Title('Pizzicato'), false, ''), done);
        });
        it("Fill remaining meal proposal informations", function (done) {
            var mealProposalID = new Immutables.Guid();
            var fillRemainingMealProposalInformations = new FillMealProposalInformations(mealProposalID, new Immutables.Description('a more complete description'), new Immutables.Time(11, 30), new Immutables.Euros(7.90), true);
            TestThat.given(anExistingUser()).and(anAlreadyInitiatedMealProposal(mealProposalID, new Immutables.Title('Pizzicato'))).when(fillRemainingMealProposalInformations).then(new MealProposalInformationsFilled(mealProposalID, new Immutables.Description('a more complete description'), new Immutables.Time(11, 30), new Immutables.Euros(7.90), true), done);
        });
        it("Publish meal proposal when all informations are filled", function (done) {
            var mealProposalID = new Immutables.Guid();
            var fillRemainingMealProposalInformations = new FillMealProposalInformations(mealProposalID, new Immutables.Description('a more complete description'), new Immutables.Time(11, 30), new Immutables.Euros(7.90), true);
            TestThat.given(anExistingUser()).and(anAlreadyInitiatedMealProposal(mealProposalID, new Immutables.Title('Pizzicato'))).when(fillRemainingMealProposalInformations).then(new MealProposalPublished(mealProposalID, new Immutables.Title('Pizzicato'), new Immutables.Description('a more complete description'), new Immutables.Time(11, 30), new Immutables.Euros(7.90), true, false, ''), done);
        });
        after(function (done) {
            done();
        });
        function anExistingUser() {
            return [new NewUserAccountRegistered(TEST_USER_ID, new Immutables.Login("testUser"))];
        }
        ;
        function anAlreadyInitiatedMealProposal(mealProposalID, title) {
            return [new MealProposalInitiated(mealProposalID, TEST_USER_ID, title, false, '')];
        }
        ;
    });
});
