var OuvrirCompteUtilisateur = require("./Commandes/Utilisateurs/OuvrirCompteUtilisateur");
var CompteUtilisateurOuvert = require("./Events/Utilisateurs/CompteUtilisateurOuvert");
var CommandDispatcher = require("./Infrastructure/CommandDispatcher");

function commande(commande) {
    return new ThenContext(commande);
}
exports.commande = commande;

var ThenContext = (function () {
    function ThenContext(commande) {
        this.commande = commande;
    }
    ThenContext.prototype.thenExpect = function (expected) {
        var success = false;
        var commandeDispatcher = new CommandDispatcher();

        commandeDispatcher.dispatchCommand(this.commande);

        if (this.commande instanceof OuvrirCompteUtilisateur) {
            var commandeTypee = this.commande;
            var eventGenere = new CompteUtilisateurOuvert(commandeTypee.getIdCompteUtilisateur(), commandeTypee.getNomUtilisateur());

            if (eventGenere.equals(expected)) {
                success = true;
            }
        }

        if (!success)
            fail();
    };
    return ThenContext;
})();
exports.ThenContext = ThenContext;
