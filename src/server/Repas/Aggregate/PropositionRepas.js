var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PropositionRepasPubliee = require("../Events/PropositionRepas/PropositionRepasPubliee");
var AggregateBase = require("../../Infrastructure/AggregateBase");
var InformationsSecondairesPropositionRepasRenseignees = require("../Events/PropositionRepas/InformationsSecondairesPropositionRepasRenseignees");

var PropositionRepasDebutee = require("../Events/PropositionRepas/PropositionRepasDebutee");
var Infrastructure = require("../../Infrastructure/Infrastructure");


var PropositionRepas = (function (_super) {
    __extends(PropositionRepas, _super);
    function PropositionRepas(aggregateId) {
        _super.call(this);
        this.aggregateId = aggregateId;
    }
    PropositionRepas.prototype.getId = function () {
        return this.aggregateId;
    };

    PropositionRepas.prototype.handleCommande = function (commande) {
        switch (commande.getCommandType()) {
            case 1 /* DebuterPropositionRepas */:
                this.handleCommandeDebuterPropositionRepas(commande);
                break;
            case 2 /* RenseignerInformationSecondairesPropositionRepas */:
                this.handleCommandeRenseignerInformationSecondairesPropositionRepas(commande);
                break;
            case 3 /* PublierPropositionRepas */:
                this.handleCommandePublierPropositionRepas(commande);
                break;
        }
    };

    PropositionRepas.prototype.handleCommandeDebuterPropositionRepas = function (commande) {
        this.addEvent(new PropositionRepasDebutee(commande.idPropositionRepas, commande.idUtilisateur, commande.libelle, commande.isPrive, commande.invitations));
    };

    PropositionRepas.prototype.handleCommandeRenseignerInformationSecondairesPropositionRepas = function (commande) {
        this.addEvent(new InformationsSecondairesPropositionRepasRenseignees(commande.idPropositionRepas, commande.description, commande.heureMaxReservation, commande.montantMax, commande.livraisonComprise));
    };

    PropositionRepas.prototype.handleCommandePublierPropositionRepas = function (commande) {
        this.addEvent(new PropositionRepasPubliee(this.aggregateId, this.libelle, this.description, this.heureMaxReservation, this.montantMax, this.livraisonComprise, this.isPrive, this.invitations));
    };

    PropositionRepas.prototype.handleEvent = function (event) {
        switch (event.getEventType()) {
            case 1 /* PropositionRepasDebutee */:
                this.handleEventPropositionRepasDebutee(event);
                break;
            case 2 /* InformationsSecondairesPropositionRepasRenseignees */:
                this.handleEventInformationsSecondairesPropositionRepasRenseignees(event);
                break;
        }
    };

    PropositionRepas.prototype.handleEventPropositionRepasDebutee = function (event) {
        this.libelle = event.libelle;
        this.invitations = event.invitations;
        this.isPrive = event.isPrive;
    };

    PropositionRepas.prototype.handleEventInformationsSecondairesPropositionRepasRenseignees = function (event) {
        this.description = event.description;
        this.heureMaxReservation = event.heureMaxReservation;
        this.montantMax = event.montantMax;
        this.livraisonComprise = event.livraisonComprise;
    };
    return PropositionRepas;
})(AggregateBase);
module.exports = PropositionRepas;
