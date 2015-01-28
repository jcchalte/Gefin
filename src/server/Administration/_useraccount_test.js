var EventDispatcher = require("../Infrastructure/__Implementations/EventDispatcher");
var InMemoryEventRepository = require("../Infrastructure/__Implementations/InMemoryEventRepository");
var CommandDispatcher = require("./../Infrastructure/__Implementations/CommandDispatcher");
var Infrastructure = require("./../Infrastructure/Infrastructure");
var Immutables = require("./../Immutables/Immutables");
var RegisterNewUserAccount = require("./Commands/RegisterNewUserAccount");
var NewUserAccountRegistered = require("./Events/NewUserAccountRegistered");
var TestThat = require("../TestThat");
describe("User accounts >", function () {
    var ID_USER = new Immutables.Guid();
    before(function (done) {
        Infrastructure.ServiceInjection.injectServices(new EventDispatcher(), new InMemoryEventRepository(), new CommandDispatcher());
        done();
    });
    describe("normal cases >", function () {
        it("User account register process", function (done) {
            var adminRegisterNewUserAccount = new RegisterNewUserAccount(ID_USER, new Immutables.Login("new user"));
            TestThat.when(adminRegisterNewUserAccount).then(new NewUserAccountRegistered(ID_USER, new Immutables.Login("new user")), done);
        });
    });
    describe("error cases >", function () {
        it("Invalid commands", function (done) {
            var adminRegisterNewUserAccountWithoutLogin = new RegisterNewUserAccount(ID_USER, null);
            TestThat.when(adminRegisterNewUserAccountWithoutLogin).thenItFails(function (error) {
                return error.message === "The login is required";
            }, done);
        });
    });
    after(function (done) {
        done();
    });
});
