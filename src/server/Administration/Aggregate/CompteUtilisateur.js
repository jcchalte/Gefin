var Infrastructure = require("../../Infrastructure/Infrastructure");
var CompteUtilisateurOuvert = require("../Events/Utilisateurs/CompteUtilisateurOuvert");

var CompteUtilisateur;
(function (CompteUtilisateur) {
    function handleCommandeOuvrirCompteUtilisateur(commande) {
        Infrastructure.IEventRepository.getInstance().commitEvents([new CompteUtilisateurOuvert(commande.getAggregateId(), commande.nomUtilisateur)]);
    }
    CompteUtilisateur.handleCommandeOuvrirCompteUtilisateur = handleCommandeOuvrirCompteUtilisateur;
})(CompteUtilisateur || (CompteUtilisateur = {}));
module.exports = CompteUtilisateur;
