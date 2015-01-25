var Infrastructure = require("../../../Infrastructure/Infrastructure");

var CommandeType = Infrastructure.CommandeType;
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

    DebuterPropositionRepas.prototype.getCommandType = function () {
        return 1 /* DebuterPropositionRepas */;
    };
    return DebuterPropositionRepas;
})();
module.exports = DebuterPropositionRepas;
