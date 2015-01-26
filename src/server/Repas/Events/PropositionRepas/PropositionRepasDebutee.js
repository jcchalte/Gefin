var PropositionRepasDebutee = (function () {
    function PropositionRepasDebutee(idPropositionRepas, idUtilisateur, libelle, isPrive, invitations) {
        this.idPropositionRepas = idPropositionRepas;
        this.idUtilisateur = idUtilisateur;
        this.libelle = libelle;
        this.invitations = invitations;
        this.isPrive = isPrive;
    }
    PropositionRepasDebutee.prototype.equals = function (left) {
        return this.idPropositionRepas.equals(left.idPropositionRepas) && this.idUtilisateur.equals(left.idUtilisateur) && this.libelle.equals(left.libelle) && this.invitations === left.invitations && this.isPrive === left.isPrive;
    };

    PropositionRepasDebutee.prototype.getAggregateId = function () {
        return this.idPropositionRepas;
    };
    return PropositionRepasDebutee;
})();
module.exports = PropositionRepasDebutee;
