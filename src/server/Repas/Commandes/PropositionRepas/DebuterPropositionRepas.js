var Infrastructure = require("../../../Infrastructure/Infrastructure");
var ro = require("../../../ReadOnly");
var DebuterPropositionRepas = (function () {
    function DebuterPropositionRepas(idPropositionRepas, idUtilisateur, libelle, isPrive, invitations) {
        this.idPropositionRepas = ro.field(idPropositionRepas);
        this.idUtilisateur = ro.field(idUtilisateur);
        this.libelle = ro.field(libelle);
        this.invitations = ro.field(invitations);
        this.isPrive = ro.field(isPrive);
    }
    DebuterPropositionRepas.prototype.getAggregateId = function () {
        return this.idPropositionRepas();
    };
    DebuterPropositionRepas.prototype.getAssociatedAggregateType = function () {
        return 1 /* PropositionRepas */;
    };
    return DebuterPropositionRepas;
})();
module.exports = DebuterPropositionRepas;
