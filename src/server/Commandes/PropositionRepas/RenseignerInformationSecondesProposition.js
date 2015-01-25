/// <reference path="../../../../Scripts/GlobalReferences.d.ts"/>
var RenseignerInformationSecondesProposition = (function () {
    function RenseignerInformationSecondesProposition(idPropositionRepas, description, heureMaxReservation, montantMax, livraisonComprise) {
        this.idPropositionRepas = idPropositionRepas;
        this.description = description;
        this.heureMaxReservation = heureMaxReservation;
        this.montantMax = montantMax;
        this.livraisonComprise = livraisonComprise;
    }
    RenseignerInformationSecondesProposition.prototype.getIdPropositionRepas = function () {
        return this.idPropositionRepas;
    };

    RenseignerInformationSecondesProposition.prototype.getDescription = function () {
        return this.description;
    };
    RenseignerInformationSecondesProposition.prototype.getHeureMaxReservation = function () {
        return this.heureMaxReservation;
    };
    RenseignerInformationSecondesProposition.prototype.getMontantMax = function () {
        return this.montantMax;
    };
    RenseignerInformationSecondesProposition.prototype.getLivraisonComprise = function () {
        return this.livraisonComprise;
    };

    RenseignerInformationSecondesProposition.prototype.getAggregateId = function () {
        return this.idPropositionRepas;
    };

    RenseignerInformationSecondesProposition.prototype.getAssociatedAggregate = function () {
        var propositionRepas = require("../../Aggregate/PropositionRepas");
        return new propositionRepas(this.getAggregateId());
    };
    return RenseignerInformationSecondesProposition;
})();
module.exports = RenseignerInformationSecondesProposition;
