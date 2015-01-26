import EventDispatcher = require("../Infrastructure/__Implementations/EventDispatcher");
import InMemoryEventRepository = require("../Infrastructure/__Implementations/InMemoryEventRepository");
import CommandDispatcher = require("./../Infrastructure/__Implementations/CommandDispatcher");

import Infrastructure = require("./../Infrastructure/Infrastructure");

import Login = require("./Immutables/Utilisateur/Login");
import Immutables = require("./../Immutables/Immutables");
import OuvrirCompteUtilisateur = require("./Commandes/Utilisateurs/OuvrirCompteUtilisateur");
import CompteUtilisateurOuvert = require("./Events/Utilisateurs/CompteUtilisateurOuvert");
import when = require("../when");

describe("Commandes >", () => {
    describe("Utilisateurs >", () => {
        var LOGIN_UTILISATEUR =new Login("chalteje");

        before((done) => {
            Infrastructure.ServiceInjection.injectServices(new EventDispatcher(), new InMemoryEventRepository(), new CommandDispatcher());

            done();
        });

        it("when un administrateur souhaite ouvrir un nouveau compte, then un nouveau compte est créé", (done) => {
            var commandeUuid = new Immutables.Guid();

            var ouvrirCompteUtilisateur = new OuvrirCompteUtilisateur(commandeUuid, LOGIN_UTILISATEUR);

            when.commande(ouvrirCompteUtilisateur).thenExpect(new CompteUtilisateurOuvert(commandeUuid, LOGIN_UTILISATEUR));

            done();
        });

        after((done) => {
            done();
        });
    });
});