var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Infrastructure = require("../Infrastructure/Infrastructure");
var CompteUtilisateurOuvert = require("../Events/Utilisateurs/CompteUtilisateurOuvert");

var OuvrirCompteUtilisateur = require("../Commandes/Utilisateurs/OuvrirCompteUtilisateur");


var CompteUtilisateur = (function (_super) {
    __extends(CompteUtilisateur, _super);
    function CompteUtilisateur(aggregateId) {
        _super.call(this);
        this.aggregateId = aggregateId;
    }
    CompteUtilisateur.prototype.handleCommande = function (commande) {
        if (commande instanceof OuvrirCompteUtilisateur.constructor) {
            var commandeTypee = commande;
            this.addEvent(new CompteUtilisateurOuvert(commandeTypee.getAggregateId(), commandeTypee.getNomUtilisateur()));
        }
    };

    CompteUtilisateur.prototype.handleEvent = function (event) {
        if (event instanceof CompteUtilisateurOuvert.constructor) {
            var eventTypee = event;
            this.login = eventTypee.getNomUtilisateur();
        }
    };
    return CompteUtilisateur;
})(Infrastructure.AggregateBase);
module.exports = CompteUtilisateur;
