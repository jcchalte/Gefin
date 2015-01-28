import EventDispatcher = require("../Infrastructure/__Implementations/EventDispatcher");
import InMemoryEventRepository = require("../Infrastructure/__Implementations/InMemoryEventRepository");
import CommandDispatcher = require("./../Infrastructure/__Implementations/CommandDispatcher");

import Infrastructure = require("./../Infrastructure/Infrastructure");

import Immutables = require("./../Immutables/Immutables");
import RegisterNewUserAccount = require("./Commands/RegisterNewUserAccount");
import NewUserAccountRegistered = require("./Events/NewUserAccountRegistered");

import TestThat = require("../TestThat");


describe("User accounts >", () => {

    var ID_USER = new Immutables.Guid();

    before((done) => {
        Infrastructure.ServiceInjection.injectServices(new EventDispatcher(), new InMemoryEventRepository(), new CommandDispatcher());
        done();
    });


    describe("normal cases >", () => {

        it("User account register process", (done) => {
            var adminRegisterNewUserAccount = new RegisterNewUserAccount(ID_USER, new Immutables.Login("new user"));

            TestThat.when(adminRegisterNewUserAccount)
                .then(new NewUserAccountRegistered(ID_USER, new Immutables.Login("new user")), done);
        });

    });

    describe("error cases >", () => {

        it("Invalid commands", (done) => {
            var adminRegisterNewUserAccountWithoutLogin = new RegisterNewUserAccount(ID_USER, null);

            TestThat.when(adminRegisterNewUserAccountWithoutLogin)
                .thenItFails((error: Error) => {
                    return error.message === "The login is required";
                }, done);
        });

    });

    after((done) => {
        done();
    });

});