import EventDispatcher = require("../Infrastructure/__Implementations/EventDispatcher");
import InMemoryEventRepository = require("../Infrastructure/__Implementations/InMemoryEventRepository");
import CommandDispatcher = require("./../Infrastructure/__Implementations/CommandDispatcher");

import Infrastructure = require("./../Infrastructure/Infrastructure");

import Immutables = require("./../Immutables/Immutables");
import RegisterNewUserAccount = require("./Commands/RegisterNewUserAccount");
import NewUserAccountRegistered = require("./Events/NewUserAccountRegistered");

import TestThat = require("../TestThat");


describe("Commands >", () => {
    describe("User accounts >", () => {
        var ID_USER = new Immutables.Guid();
        
        before((done) => {
            Infrastructure.ServiceInjection.injectServices(new EventDispatcher(), new InMemoryEventRepository(), new CommandDispatcher());
            done();
        });

        it("User account register process", (done) => {
            var adminRegisterNewUserAccount = new RegisterNewUserAccount(ID_USER, new Immutables.Login("new user"));

            TestThat.when(adminRegisterNewUserAccount)
                .then(new NewUserAccountRegistered(ID_USER, new Immutables.Login("new user")), done);
        });

        after((done) => {
            done();
        });
    });
});