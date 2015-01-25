/// <reference path="../../../../Scripts/GlobalReferences.d.ts"/>
import Login = require("../../Shared/Immutables/Utilisateur/Login");
import Guid = require("../../Shared/Immutables/Guid");
import OuvrirCompteUtilisateur = require("./OuvrirCompteUtilisateur");
import CompteUtilisateurOuvert = require("../../Events/Utilisateurs/CompteUtilisateurOuvert");
import when = require("../../when");

describe("Commandes >", () => {
    describe("Utilisateurs >", () => {
        var LOGIN_UTILISATEUR =new Login("chalteje");

        before((done) => {
            done();
        });

        it("when l'utilisateur souhaite ouvrir un nouveau compte, then un nouveau compte est créé", (done) => {
            var commandeUuid = new Guid();

            var ouvrirCompteUtilisateur = new OuvrirCompteUtilisateur(commandeUuid, LOGIN_UTILISATEUR);

            when.commande(ouvrirCompteUtilisateur).thenExpect(new CompteUtilisateurOuvert(commandeUuid, LOGIN_UTILISATEUR));

            done();
        });

        after((done) => {
            done();
        });
    });
});