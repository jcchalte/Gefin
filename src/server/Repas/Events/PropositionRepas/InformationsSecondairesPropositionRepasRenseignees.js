var InformationsSecondairesPropositionRepasRenseignees = (function () {
    function InformationsSecondairesPropositionRepasRenseignees(idPropositionRepas, description, heureMaxReservation, montantMax, livraisonComprise) {
        this.idPropositionRepas = idPropositionRepas;
        this.description = description;
        this.heureMaxReservation = heureMaxReservation;
        this.montantMax = montantMax;
        this.livraisonComprise = livraisonComprise;
    }
    InformationsSecondairesPropositionRepasRenseignees.prototype.equals = function (left) {
        return this.idPropositionRepas.equals(left.idPropositionRepas) && this.description.equals(left.description) && this.heureMaxReservation.equals(left.heureMaxReservation) && this.montantMax.equals(left.montantMax) && this.livraisonComprise === left.livraisonComprise;
    };

    InformationsSecondairesPropositionRepasRenseignees.prototype.getAggregateId = function () {
        return this.idPropositionRepas;
    };
    return InformationsSecondairesPropositionRepasRenseignees;
})();
module.exports = InformationsSecondairesPropositionRepasRenseignees;
