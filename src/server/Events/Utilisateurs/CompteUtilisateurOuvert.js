/// <reference path="../../../../Scripts/GlobalReferences.d.ts"/>
var Infrastructure = require("../../Infrastructure/Infrastructure");

var CompteUtilisateurOuvert = (function () {
    function CompteUtilisateurOuvert(idCompteUtilisateur, nomUtilisateur) {
        this.idCompteUtilisateur = idCompteUtilisateur;
        this.nomUtilisateur = nomUtilisateur;
    }
    CompteUtilisateurOuvert.prototype.getNomUtilisateur = function () {
        return this.getNomUtilisateur();
    };

    CompteUtilisateurOuvert.prototype.equals = function (left) {
        return true;
    };

    CompteUtilisateurOuvert.prototype.getAggregateId = function () {
        return this.idCompteUtilisateur;
    };

    CompteUtilisateurOuvert.prototype.getEventName = function () {
        return new Infrastructure.EventName("CompteUtilisateurOuvert");
    };
    return CompteUtilisateurOuvert;
})();
module.exports = CompteUtilisateurOuvert;
