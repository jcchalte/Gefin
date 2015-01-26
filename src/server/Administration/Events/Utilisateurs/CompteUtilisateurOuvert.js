var CompteUtilisateurOuvert = (function () {
    function CompteUtilisateurOuvert(idCompteUtilisateur, nomUtilisateur) {
        this.idCompteUtilisateur = idCompteUtilisateur;
        this.nomUtilisateur = nomUtilisateur;
    }
    CompteUtilisateurOuvert.prototype.equals = function (left) {
        return this.idCompteUtilisateur.equals(left.idCompteUtilisateur) && this.nomUtilisateur.equals(left.nomUtilisateur);
    };

    CompteUtilisateurOuvert.prototype.getAggregateId = function () {
        return this.idCompteUtilisateur;
    };
    return CompteUtilisateurOuvert;
})();
module.exports = CompteUtilisateurOuvert;
