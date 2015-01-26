/// <reference path="../../../../../Scripts/GlobalReferences.d.ts"/>
var ro = require("../../../ReadOnly");

var CompteUtilisateurOuvert = (function () {
    function CompteUtilisateurOuvert(idCompteUtilisateur, nomUtilisateur) {
        this.idCompteUtilisateur = ro.field(idCompteUtilisateur);
        this.nomUtilisateur = ro.field(nomUtilisateur);
    }
    CompteUtilisateurOuvert.prototype.equals = function (left) {
        return this.idCompteUtilisateur.equals(left.idCompteUtilisateur) && this.nomUtilisateur.equals(left.nomUtilisateur);
    };

    CompteUtilisateurOuvert.prototype.getAggregateId = function () {
        return this.idCompteUtilisateur();
    };
    return CompteUtilisateurOuvert;
})();
module.exports = CompteUtilisateurOuvert;
