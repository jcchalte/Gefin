/// <reference path="../../../../../Scripts/GlobalReferences.d.ts"/>
var Infrastructure = require("../../../Infrastructure/Infrastructure");
var ro = require("../../../ReadOnly");
var RenseignerInformationSecondairesPropositionRepas = (function () {
    function RenseignerInformationSecondairesPropositionRepas(idPropositionRepas, description, heureMaxReservation, montantMax, livraisonComprise) {
        this.idPropositionRepas = ro.field(idPropositionRepas);
        this.description = ro.field(description);
        this.heureMaxReservation = ro.field(heureMaxReservation);
        this.montantMax = ro.field(montantMax);
        this.livraisonComprise = ro.field(livraisonComprise);
    }
    RenseignerInformationSecondairesPropositionRepas.prototype.getAggregateId = function () {
        return this.idPropositionRepas;
    };
    RenseignerInformationSecondairesPropositionRepas.prototype.getAssociatedAggregateType = function () {
        return 1 /* PropositionRepas */;
    };
    return RenseignerInformationSecondairesPropositionRepas;
})();
module.exports = RenseignerInformationSecondairesPropositionRepas;
