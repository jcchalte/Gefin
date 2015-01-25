var Infrastructure = require("../../../Infrastructure/Infrastructure");

var PropositionRepasPubliee = (function () {
    function PropositionRepasPubliee(idPropositionRepas, libelle, description, heureMaxReservation, montantMax, livraisonComprise, isPrive, invitations) {
        this.idPropositionRepas = idPropositionRepas;
        this.libelle = libelle;
        this.description = description;
        this.heureMaxReservation = heureMaxReservation;
        this.montantMax = montantMax;
        this.livraisonComprise = livraisonComprise;
        this.isPrive = isPrive;
        this.invitations = invitations;
    }
    PropositionRepasPubliee.prototype.equals = function (left) {
        return this.idPropositionRepas.equals(left.idPropositionRepas) && this.libelle.equals(left.libelle) && this.description.equals(left.description) && this.heureMaxReservation.equals(left.heureMaxReservation) && this.montantMax.equals(left.montantMax) && this.livraisonComprise === left.livraisonComprise && this.isPrive === left.isPrive && this.invitations === left.invitations;
    };

    PropositionRepasPubliee.prototype.getAggregateId = function () {
        return this.idPropositionRepas;
    };

    PropositionRepasPubliee.prototype.getEventType = function () {
        return 3 /* PropositionRepasPubliee */;
    };
    return PropositionRepasPubliee;
})();
module.exports = PropositionRepasPubliee;
