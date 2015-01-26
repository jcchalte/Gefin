/// <reference path="../../../../../Scripts/GlobalReferences.d.ts"/>
var Infrastructure = require("../../../Infrastructure/Infrastructure");

var OuvrirCompteUtilisateur = (function () {
    function OuvrirCompteUtilisateur(idCompteUtilisateur, nomUtilisateur) {
        this.idCompteUtilisateur = idCompteUtilisateur;
        this.nomUtilisateur = nomUtilisateur;
    }
    OuvrirCompteUtilisateur.prototype.getAggregateId = function () {
        return this.idCompteUtilisateur;
    };

    OuvrirCompteUtilisateur.prototype.getAssociatedAggregateType = function () {
        return 0 /* CompteUtilisateur */;
    };
    return OuvrirCompteUtilisateur;
})();
module.exports = OuvrirCompteUtilisateur;
