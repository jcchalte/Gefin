/// <reference path="../../../../Scripts/GlobalReferences.d.ts"/>
var Login = require("../../Shared/Immutables/Utilisateur/Login");
var Guid = require("../../Shared/Immutables/Guid");
var OuvrirCompteUtilisateur = require("./OuvrirCompteUtilisateur");
var CompteUtilisateurOuvert = require("../../Events/Utilisateurs/CompteUtilisateurOuvert");
var when = require("../../when");

describe("Commandes >", function () {
    describe("Utilisateurs >", function () {
        var LOGIN_UTILISATEUR = new Login("chalteje");

        before(function (done) {
            done();
        });

        it("when l'utilisateur souhaite ouvrir un nouveau compte, then un nouveau compte est créé", function (done) {
            var commandeUuid = new Guid();

            var ouvrirCompteUtilisateur = new OuvrirCompteUtilisateur(commandeUuid, LOGIN_UTILISATEUR);

            when.commande(ouvrirCompteUtilisateur).thenExpect(new CompteUtilisateurOuvert(commandeUuid, LOGIN_UTILISATEUR));

            done();
        });

        after(function (done) {
            done();
        });
    });
});
