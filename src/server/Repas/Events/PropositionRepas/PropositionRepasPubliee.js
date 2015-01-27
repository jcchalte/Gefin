var ro = require("../../../ReadOnly");
var PropositionRepasPubliee = (function () {
    function PropositionRepasPubliee(idPropositionRepas, libelle, description, heureMaxReservation, montantMax, livraisonComprise, isPrive, invitations) {
        this.idPropositionRepas = ro.field(idPropositionRepas);
        this.libelle = ro.field(libelle);
        this.description = ro.field(description);
        this.heureMaxReservation = ro.field(heureMaxReservation);
        this.montantMax = ro.field(montantMax);
        this.livraisonComprise = ro.field(livraisonComprise);
        this.isPrive = ro.field(isPrive);
        this.invitations = ro.field(invitations);
    }
    PropositionRepasPubliee.prototype.equals = function (left) {
        return this.idPropositionRepas.equals(left.idPropositionRepas) && this.libelle.equals(left.libelle) && this.description.equals(left.description) && this.heureMaxReservation.equals(left.heureMaxReservation) && this.montantMax.equals(left.montantMax) && this.livraisonComprise.equals(left.livraisonComprise) && this.isPrive.equals(left.isPrive) && this.invitations.equals(left.invitations);
    };
    PropositionRepasPubliee.prototype.getAggregateId = function () {
        return this.idPropositionRepas();
    };
    return PropositionRepasPubliee;
})();
module.exports = PropositionRepasPubliee;
