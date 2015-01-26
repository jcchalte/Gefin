import Infrastructure = require("../../Infrastructure/Infrastructure");
import CompteUtilisateurOuvert = require("../Events/Utilisateurs/CompteUtilisateurOuvert");
import OuvrirCompteUtilisateur = require("../Commandes/Utilisateurs/OuvrirCompteUtilisateur");

export = CompteUtilisateur;
module CompteUtilisateur {
    export function handleCommandeOuvrirCompteUtilisateur(commande: OuvrirCompteUtilisateur) {
        Infrastructure.IEventRepository.getInstance().commitEvents([new CompteUtilisateurOuvert(commande.getAggregateId(), commande.nomUtilisateur())]);
    }
}