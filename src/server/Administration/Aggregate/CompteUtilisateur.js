var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AggregateBase = require("../../Infrastructure/AggregateBase");
var Infrastructure = require("../../Infrastructure/Infrastructure");
var CompteUtilisateurOuvert = require("../Events/Utilisateurs/CompteUtilisateurOuvert");


var CompteUtilisateur = (function (_super) {
    __extends(CompteUtilisateur, _super);
    function CompteUtilisateur(aggregateId) {
        _super.call(this);
        this.aggregateId = aggregateId;
    }
    CompteUtilisateur.prototype.handleCommande = function (commande) {
        switch (commande.getCommandType()) {
            case 0 /* OuvrirCompteUtilisateur */:
                this.handleCommandeOuvrirCompteUtilisateur(commande);
                break;
        }
    };

    CompteUtilisateur.prototype.handleCommandeOuvrirCompteUtilisateur = function (commande) {
        this.addEvent(new CompteUtilisateurOuvert(commande.getAggregateId(), commande.nomUtilisateur));
    };

    CompteUtilisateur.prototype.handleEvent = function (event) {
        switch (event.getEventType()) {
            case 0 /* CompteUtilisateurOuvert */:
                this.handleEventCompteUtilisateurOuvert(event);
                break;
        }
    };

    CompteUtilisateur.prototype.handleEventCompteUtilisateurOuvert = function (event) {
        this.login = event.nomUtilisateur;
    };
    return CompteUtilisateur;
})(AggregateBase);
module.exports = CompteUtilisateur;
