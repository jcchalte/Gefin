var Infrastructure = require("../../../Infrastructure/Infrastructure");
var ro = require("../../../ReadOnly");
var PropositionRepasDebutee = (function () {
    function PropositionRepasDebutee(idPropositionRepas, idUtilisateur, libelle, isPrive, invitations) {
        this.idPropositionRepas = ro.field(idPropositionRepas);
        this.idUtilisateur = ro.field(idUtilisateur);
        this.libelle = ro.field(libelle);
        this.invitations = ro.field(invitations);
        this.isPrive = ro.field(isPrive);
    }
    PropositionRepasDebutee.prototype.equals = function (left) {
        return this.idPropositionRepas.equals(left.idPropositionRepas) && this.idUtilisateur.equals(left.idUtilisateur) && this.libelle.equals(left.libelle) && this.invitations.equals(left.invitations) && this.isPrive.equals(left.isPrive);
    };
    PropositionRepasDebutee.prototype.getAggregateId = function () {
        return this.idPropositionRepas();
    };
    PropositionRepasDebutee.prototype.getAggregateType = function () {
        return 1 /* PropositionRepas */;
    };
    return PropositionRepasDebutee;
})();
module.exports = PropositionRepasDebutee;
