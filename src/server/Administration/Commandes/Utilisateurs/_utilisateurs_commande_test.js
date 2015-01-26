/// <reference path="../../../../../Scripts/GlobalReferences.d.ts"/>
var EventDispatcher = require("../../../Infrastructure/__Implementations/EventDispatcher");
var InMemoryEventRepository = require("../../../Infrastructure/__Implementations/InMemoryEventRepository");
var CommandDispatcher = require("../../../Infrastructure/__Implementations/CommandDispatcher");

var Infrastructure = require("../../../Infrastructure/Infrastructure");

var Login = require("../../Immutables/Utilisateur/Login");
var Immutables = require("../../../Immutables/Immutables");
var OuvrirCompteUtilisateur = require("./OuvrirCompteUtilisateur");
var CompteUtilisateurOuvert = require("../../Events/Utilisateurs/CompteUtilisateurOuvert");
var when = require("../../../when");

describe("Commandes >", function () {
    describe("Utilisateurs >", function () {
        var LOGIN_UTILISATEUR = new Login("chalteje");

        before(function (done) {
            Infrastructure.ServiceInjection.injectServices(new EventDispatcher(), new InMemoryEventRepository(), new CommandDispatcher());

            done();
        });

        it("when un administrateur souhaite ouvrir un nouveau compte, then un nouveau compte est créé", function (done) {
            var commandeUuid = new Immutables.Guid();

            var ouvrirCompteUtilisateur = new OuvrirCompteUtilisateur(commandeUuid, LOGIN_UTILISATEUR);

            when.commande(ouvrirCompteUtilisateur).thenExpect(new CompteUtilisateurOuvert(commandeUuid, LOGIN_UTILISATEUR));

            done();
        });

        after(function (done) {
            done();
        });
    });
});
