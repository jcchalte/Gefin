var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Infrastructure = require("../../Infrastructure/Infrastructure");
var CompteUtilisateurOuvert = require("../Events/Utilisateurs/CompteUtilisateurOuvert");
var ro = require("../../ReadOnly");
var CompteUtilisateur;
(function (CompteUtilisateur) {
    function handleCommandeOuvrirCompteUtilisateur(commande) {
        var utilisateurID = commande.getAggregateId();
        var events = Infrastructure.IEventRepository.getInstance().getEventsForAggregate(utilisateurID);
        var state = new CompteUtilisateurState(events);
        if (state.isActive()) {
            throw new Error("The user " + commande.nomUtilisateur().value() + " is already opened");
        }
        Infrastructure.commitEvents([new CompteUtilisateurOuvert(commande.getAggregateId(), commande.nomUtilisateur())]);
    }
    CompteUtilisateur.handleCommandeOuvrirCompteUtilisateur = handleCommandeOuvrirCompteUtilisateur;
})(CompteUtilisateur || (CompteUtilisateur = {}));
var CompteUtilisateurState = (function (_super) {
    __extends(CompteUtilisateurState, _super);
    function CompteUtilisateurState(events) {
        var _this = this;
        this.isActive = ro.field(false);
        _super.call(this);
        events.forEach(function (event) {
            _this.callHandleEventDynamically(event);
        });
    }
    CompteUtilisateurState.prototype.handleEventCompteUtilisateurOuvert = function (event) {
        this.isActive = ro.field(true);
    };
    return CompteUtilisateurState;
})(Infrastructure.StateBase);
module.exports = CompteUtilisateur;
