import Infrastructure = require("../Infrastructure");
import PropositionRepas = require("../../Repas/Aggregate/PropositionRepas");
import CompteUtilisateur = require("../../Administration/Aggregate/CompteUtilisateur");

export = CommandDispatcher
class CommandDispatcher implements Infrastructure.ICommandDispatcher {


    public dispatchCommand(commande: Infrastructure.ICommande): void {

        //1. Charger depuis un repository d'event ou créer l'aggrégat correspondant à la commande
        //2. Appeler la méthode "Handle" correspondant à la commande
        //      - Cette méthode regarde par rapport à ses projections si la commande est envisageable
        //      - En fonction de ses projections, elle rajoute des events dans la liste d'event à publier
        //3. On "Sauvegarde" les évènements à publier, c'est à dire qu'on va trigger tous les handlers et qu'on sauvegarde dans un repository   
        var aggregateType = commande.getAssociatedAggregateType();

        var moduleAAppeler: any;
        switch (aggregateType) {
            case Infrastructure.Referentiel.AggregateType.PropositionRepas:
                moduleAAppeler = PropositionRepas;
                break;
            case Infrastructure.Referentiel.AggregateType.CompteUtilisateur:
                moduleAAppeler = CompteUtilisateur;
                break;
            default:
                throw new Error("NotImplementedException");
        }
        var methodeAAppeler = "handleCommande" + (<any>commande.constructor).name;

        if (moduleAAppeler[methodeAAppeler] == null || typeof moduleAAppeler[methodeAAppeler] !== "function")
            throw new Error("Le module " + moduleAAppeler.constructor.name + " n'implémente pas la méthode " + methodeAAppeler);
        moduleAAppeler[methodeAAppeler].call(this, commande);
    }



}