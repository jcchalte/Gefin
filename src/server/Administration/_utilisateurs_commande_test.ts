import EventDispatcher = require("../Infrastructure/__Implementations/EventDispatcher");
import InMemoryEventRepository = require("../Infrastructure/__Implementations/InMemoryEventRepository");
import CommandDispatcher = require("./../Infrastructure/__Implementations/CommandDispatcher");

import Infrastructure = require("./../Infrastructure/Infrastructure");

import Login = require("./Immutables/Utilisateur/Login");
import Immutables = require("./../Immutables/Immutables");
import OuvrirCompteUtilisateur = require("./Commandes/Utilisateurs/OuvrirCompteUtilisateur");
import CompteUtilisateurOuvert = require("./Events/Utilisateurs/CompteUtilisateurOuvert");
import TestThat = require("../TestThat");


describe("Commandes >", () => {
    describe("Utilisateurs >", () => {
        var ID_UTILISATEUR = new Immutables.Guid();

        before((done) => {
            Infrastructure.ServiceInjection.injectServices(new EventDispatcher(), new InMemoryEventRepository(), new CommandDispatcher());

            done();
        });

        it("when un administrateur souhaite ouvrir un nouveau compte, then un nouveau compte est créé", (done) => {

            var ouvrirCompteUtilisateur = new OuvrirCompteUtilisateur(ID_UTILISATEUR, new Login("chalteje"));

            TestThat.when(ouvrirCompteUtilisateur).then(new CompteUtilisateurOuvert(ID_UTILISATEUR, new Login("chalteje")), done);
        });

        it("given un compte utilisateur déjà existant, when un administrateur tente de réouvrir ce compte, then une erreur lui est renvoyée", (done) => {

            var ouvrirCompteUtilisateur = new OuvrirCompteUtilisateur(ID_UTILISATEUR, new Login("chalteje"));

            TestThat.given(unCompteUtilisateurOuvert(new Login("chalteje")))
                .when(ouvrirCompteUtilisateur)
                .thenItFails(done);
        });

        function unCompteUtilisateurOuvert(login: Login) : Array<Infrastructure.IEvent> {
            return [
                new CompteUtilisateurOuvert(ID_UTILISATEUR, login)
            ];
        }
        after((done) => {
            done();
        });
    });
});