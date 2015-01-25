/// <reference path="../../../../Scripts/GlobalReferences.d.ts"/>
var Infrastructure = require("../../Infrastructure/Infrastructure");

var CommandeType = Infrastructure.CommandeType;
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

    OuvrirCompteUtilisateur.prototype.getCommandType = function () {
        return 0 /* OuvrirCompteUtilisateur */;
    };
    return OuvrirCompteUtilisateur;
})();
module.exports = OuvrirCompteUtilisateur;
