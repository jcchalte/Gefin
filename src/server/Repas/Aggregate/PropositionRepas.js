var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PropositionRepasPubliee = require("../Events/PropositionRepas/PropositionRepasPubliee");

var InformationsSecondairesPropositionRepasRenseignees = require("../Events/PropositionRepas/InformationsSecondairesPropositionRepasRenseignees");

var PropositionRepasDebutee = require("../Events/PropositionRepas/PropositionRepasDebutee");
var Infrastructure = require("../../Infrastructure/Infrastructure");

var PropositionRepas;
(function (PropositionRepas) {
    function handleCommandeDebuterPropositionRepas(commande) {
        Infrastructure.IEventRepository.getInstance().commitEvents([new PropositionRepasDebutee(commande.idPropositionRepas(), commande.idUtilisateur(), commande.libelle(), commande.isPrive(), commande.invitations())]);
    }
    PropositionRepas.handleCommandeDebuterPropositionRepas = handleCommandeDebuterPropositionRepas;

    function handleCommandeRenseignerInformationSecondairesPropositionRepas(commande) {
        Infrastructure.IEventRepository.getInstance().commitEvents([new InformationsSecondairesPropositionRepasRenseignees(commande.idPropositionRepas(), commande.description(), commande.heureMaxReservation(), commande.montantMax(), commande.livraisonComprise())]);
    }
    PropositionRepas.handleCommandeRenseignerInformationSecondairesPropositionRepas = handleCommandeRenseignerInformationSecondairesPropositionRepas;

    function handleCommandePublierPropositionRepas(commande) {
        var propositionRepasID = commande.getAggregateId();
        var events = Infrastructure.IEventRepository.getInstance().getEventsForAggregate(propositionRepasID);

        var state = new PropositionRepasState(events);

        Infrastructure.IEventRepository.getInstance().commitEvents([new PropositionRepasPubliee(state.idPropositionRepas(), state.libelle(), state.description(), state.heureMaxReservation(), state.montantMax(), state.livraisonComprise(), state.isPrive(), state.invitations())]);
    }
    PropositionRepas.handleCommandePublierPropositionRepas = handleCommandePublierPropositionRepas;
})(PropositionRepas || (PropositionRepas = {}));

var PropositionRepasState = (function (_super) {
    __extends(PropositionRepasState, _super);
    function PropositionRepasState(events) {
        var _this = this;
        _super.call(this);
        events.forEach(function (event) {
            _this.callHandleEventDynamically(event);
        });
    }
    PropositionRepasState.prototype.handleEventPropositionRepasDebutee = function (event) {
        this.idPropositionRepas = event.idPropositionRepas;
        this.libelle = event.libelle;
        this.invitations = event.invitations;
        this.isPrive = event.isPrive;
    };

    PropositionRepasState.prototype.handleEventInformationsSecondairesPropositionRepasRenseignees = function (event) {
        this.description = event.description;
        this.heureMaxReservation = event.heureMaxReservation;
        this.montantMax = event.montantMax;
        this.livraisonComprise = event.livraisonComprise;
    };
    return PropositionRepasState;
})(Infrastructure.StateBase);
module.exports = PropositionRepas;
