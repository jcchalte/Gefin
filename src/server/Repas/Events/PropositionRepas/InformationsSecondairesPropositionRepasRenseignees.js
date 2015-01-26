var ro = require("../../../ReadOnly");

var InformationsSecondairesPropositionRepasRenseignees = (function () {
    function InformationsSecondairesPropositionRepasRenseignees(idPropositionRepas, description, heureMaxReservation, montantMax, livraisonComprise) {
        this.idPropositionRepas = ro.field(idPropositionRepas);
        this.description = ro.field(description);
        this.heureMaxReservation = ro.field(heureMaxReservation);
        this.montantMax = ro.field(montantMax);
        this.livraisonComprise = ro.field(livraisonComprise);
    }
    InformationsSecondairesPropositionRepasRenseignees.prototype.equals = function (left) {
        return this.idPropositionRepas.equals(left.idPropositionRepas) && this.description.equals(left.description) && this.heureMaxReservation.equals(left.heureMaxReservation) && this.montantMax.equals(left.montantMax) && this.livraisonComprise.equals(left.livraisonComprise);
    };

    InformationsSecondairesPropositionRepasRenseignees.prototype.getAggregateId = function () {
        return this.idPropositionRepas();
    };
    return InformationsSecondairesPropositionRepasRenseignees;
})();
module.exports = InformationsSecondairesPropositionRepasRenseignees;
