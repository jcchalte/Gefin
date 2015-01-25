/// <reference path="../../../../Scripts/GlobalReferences.d.ts"/>
var CompteUtilisateur = require("../../Aggregate/CompteUtilisateur");

var OuvrirCompteUtilisateur = (function () {
    function OuvrirCompteUtilisateur(idCompteUtilisateur, nomUtilisateur) {
        this.idCompteUtilisateur = idCompteUtilisateur;
        this.nomUtilisateur = nomUtilisateur;
    }
    OuvrirCompteUtilisateur.prototype.getIdCompteUtilisateur = function () {
        return this.idCompteUtilisateur;
    };

    OuvrirCompteUtilisateur.prototype.getNomUtilisateur = function () {
        return this.nomUtilisateur;
    };

    OuvrirCompteUtilisateur.prototype.getAggregateId = function () {
        return this.idCompteUtilisateur;
    };

    OuvrirCompteUtilisateur.prototype.getAssociatedAggregate = function () {
        return new CompteUtilisateur(this.getAggregateId());
    };
    return OuvrirCompteUtilisateur;
})();
module.exports = OuvrirCompteUtilisateur;
