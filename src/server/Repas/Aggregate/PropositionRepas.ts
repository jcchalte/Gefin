import Libelle = require("../Immutables/PropositioRepas/Libelle");
import PropositionRepasPubliee = require("../Events/PropositionRepas/PropositionRepasPubliee");

import InformationsSecondairesPropositionRepasRenseignees = require("../Events/PropositionRepas/InformationsSecondairesPropositionRepasRenseignees");
import RenseignerInformationSecondairesPropositionRepas = require("../Commandes/PropositionRepas/RenseignerInformationSecondairesPropositionRepas");
import DebuterPropositionRepas = require("../Commandes/PropositionRepas/DebuterPropositionRepas");
import PropositionRepasDebutee = require("../Events/PropositionRepas/PropositionRepasDebutee");
import Infrastructure = require("../../Infrastructure/Infrastructure");
import Immutables = require("../../Immutables/Immutables");
import PublierPropositionRepas = require("../Commandes/PropositionRepas/PublierPropositionRepas");

export = PropositionRepas;
module PropositionRepas {
    export function handleCommandeDebuterPropositionRepas(commande: DebuterPropositionRepas) {
        Infrastructure.IEventRepository.getInstance().commitEvents([new PropositionRepasDebutee(commande.idPropositionRepas,
            commande.idUtilisateur,
            commande.libelle,
            commande.isPrive,
            commande.invitations)]);
    }

    export function handleCommandeRenseignerInformationSecondairesPropositionRepas(commande: RenseignerInformationSecondairesPropositionRepas) {
        Infrastructure.IEventRepository.getInstance().commitEvents([new InformationsSecondairesPropositionRepasRenseignees(commande.idPropositionRepas,
            commande.description,
            commande.heureMaxReservation,
            commande.montantMax,
            commande.livraisonComprise)]);
    }

    export function handleCommandePublierPropositionRepas(commande: PublierPropositionRepas) {
        var propositionRepasID = commande.getAggregateId();
        var events = Infrastructure.IEventRepository.getInstance().getEventsForAggregate(propositionRepasID);

        var state = new PropositionRepasState(events);

        Infrastructure.IEventRepository.getInstance().commitEvents([new PropositionRepasPubliee(state.idPropositionRepas,
            state.libelle,
            state.description,
            state.heureMaxReservation,
            state.montantMax,
            state.livraisonComprise,
            state.isPrive,
            state.invitations)]);
    }
}


class PropositionRepasState extends Infrastructure.StateBase {
    public idPropositionRepas: Immutables.Guid;
    public libelle: Libelle;
    public description: Immutables.Description;
    public heureMaxReservation: Immutables.Heure;
    public montantMax: Immutables.Euros;
    public livraisonComprise: boolean;
    public isPrive: boolean;
    public invitations: string;

    constructor(events: Infrastructure.IEvent[]) {
        super();
        events.forEach((event) => {
            this.callHandleEventDynamically(event);
        });
    }

    private handleEventPropositionRepasDebutee(event: PropositionRepasDebutee) {
        this.idPropositionRepas = event.idPropositionRepas;
        this.libelle = event.libelle;
        this.invitations = event.invitations;
        this.isPrive = event.isPrive;
    }

    private handleEventInformationsSecondairesPropositionRepasRenseignees(event: InformationsSecondairesPropositionRepasRenseignees) {
        this.description = event.description;
        this.heureMaxReservation = event.heureMaxReservation;
        this.montantMax = event.montantMax;
        this.livraisonComprise = event.livraisonComprise;
    }
}

