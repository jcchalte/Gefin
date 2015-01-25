/// <reference path="../../../../Scripts/GlobalReferences.d.ts"/>
var Infrastructure = require("../../Infrastructure/Infrastructure");

var CommandeType = Infrastructure.CommandeType;
var RenseignerInformationSecondairesPropositionRepas = (function () {
    function RenseignerInformationSecondairesPropositionRepas(idPropositionRepas, description, heureMaxReservation, montantMax, livraisonComprise) {
        this.idPropositionRepas = idPropositionRepas;
        this.description = description;
        this.heureMaxReservation = heureMaxReservation;
        this.montantMax = montantMax;
        this.livraisonComprise = livraisonComprise;
    }
    RenseignerInformationSecondairesPropositionRepas.prototype.getAggregateId = function () {
        return this.idPropositionRepas;
    };

    RenseignerInformationSecondairesPropositionRepas.prototype.getAssociatedAggregateType = function () {
        return 1 /* PropositionRepas */;
    };

    RenseignerInformationSecondairesPropositionRepas.prototype.getCommandType = function () {
        return 2 /* RenseignerInformationSecondairesPropositionRepas */;
    };
    return RenseignerInformationSecondairesPropositionRepas;
})();
module.exports = RenseignerInformationSecondairesPropositionRepas;
