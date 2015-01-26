var Infrastructure = require("../../../Infrastructure/Infrastructure");

var DebuterPropositionRepas = (function () {
    function DebuterPropositionRepas(idPropositionRepas, idUtilisateur, libelle, isPrive, invitations) {
        this.idPropositionRepas = idPropositionRepas;
        this.idUtilisateur = idUtilisateur;
        this.libelle = libelle;
        this.invitations = invitations;
        this.isPrive = isPrive;
    }
    DebuterPropositionRepas.prototype.getAggregateId = function () {
        return this.idPropositionRepas;
    };

    DebuterPropositionRepas.prototype.getAssociatedAggregateType = function () {
        return 1 /* PropositionRepas */;
    };
    return DebuterPropositionRepas;
})();
module.exports = DebuterPropositionRepas;
