var Infrastructure = require("../Infrastructure");
var PropositionRepas = require("../../Repas/Aggregate/PropositionRepas");
var CompteUtilisateur = require("../../Administration/Aggregate/CompteUtilisateur");

var CommandDispatcher = (function () {
    function CommandDispatcher() {
    }
    CommandDispatcher.prototype.dispatchCommand = function (commande) {
        //1. Charger depuis un repository d'event ou créer l'aggrégat correspondant à la commande
        //2. Appeler la méthode "Handle" correspondant à la commande
        //      - Cette méthode regarde par rapport à ses projections si la commande est envisageable
        //      - En fonction de ses projections, elle rajoute des events dans la liste d'event à publier
        //3. On "Sauvegarde" les évènements à publier, c'est à dire qu'on va trigger tous les handlers et qu'on sauvegarde dans un repository
        var aggregateType = commande.getAssociatedAggregateType();

        var moduleAAppeler;
        switch (aggregateType) {
            case 1 /* PropositionRepas */:
                moduleAAppeler = PropositionRepas;
                break;
            case 0 /* CompteUtilisateur */:
                moduleAAppeler = CompteUtilisateur;
                break;
            default:
                throw new Error("NotImplementedException");
        }
        var methodeAAppeler = "handleCommande" + commande.constructor.name;

        if (moduleAAppeler[methodeAAppeler] == null || typeof moduleAAppeler[methodeAAppeler] !== "function")
            throw new Error("Le module " + moduleAAppeler.constructor.name + " n'implémente pas la méthode " + methodeAAppeler);
        moduleAAppeler[methodeAAppeler].call(this, commande);
    };
    return CommandDispatcher;
})();
module.exports = CommandDispatcher;
