import Libelle = require("../Shared/Immutables/PropositioRepas/Libelle");
import PropositionRepasPubliee = require("../Events/PropositionRepas/PropositionRepasPubliee");
import AggregateBase = require("../Infrastructure/AggregateBase");
import InformationsSecondairesPropositionRepasRenseignees = require("../Events/PropositionRepas/InformationsSecondairesPropositionRepasRenseignees");
import RenseignerInformationSecondairesPropositionRepas = require("../Commandes/PropositionRepas/RenseignerInformationSecondairesPropositionRepas");
import DebuterPropositionRepas = require("../Commandes/PropositionRepas/DebuterPropositionRepas");
import PropositionRepasDebutee = require("../Events/PropositionRepas/PropositionRepasDebutee");
import Infrastructure = require("../Infrastructure/Infrastructure");
import Immutables = require("../Shared/Immutables/Immutables");
import PublierPropositionRepas = require("../Commandes/PropositionRepas/PublierPropositionRepas");

export = PropositionRepas;

class PropositionRepas extends AggregateBase implements Infrastructure.IAggregate {

    private aggregateId: Immutables.Guid;
    private libelle: Libelle;
    private description: Immutables.Description;
    private heureMaxReservation: Immutables.Heure;
    private montantMax: Immutables.Euros;
    private livraisonComprise: boolean;
    private isPrive: boolean;
    private invitations: string;



    constructor(aggregateId: Immutables.Guid) {
        super();
        this.aggregateId = aggregateId;
    }

    public getId() {
        return this.aggregateId;
    }

    handleCommande(commande: Infrastructure.ICommande) {
        switch (commande.getCommandType()) {
            case Infrastructure.CommandeType.DebuterPropositionRepas:
                this.handleCommandeDebuterPropositionRepas(<DebuterPropositionRepas>commande);
                break;
            case Infrastructure.CommandeType.RenseignerInformationSecondairesPropositionRepas:
                this.handleCommandeRenseignerInformationSecondairesPropositionRepas(<RenseignerInformationSecondairesPropositionRepas>commande);
                break;
            case Infrastructure.CommandeType.PublierPropositionRepas:
                this.handleCommandePublierPropositionRepas(<PublierPropositionRepas>commande);
                break;
        }
    }

    private handleCommandeDebuterPropositionRepas(commande: DebuterPropositionRepas) {
        this.addEvent(new PropositionRepasDebutee(commande.idPropositionRepas,
            commande.idUtilisateur,
            commande.libelle,
            commande.isPrive,
            commande.invitations));
    }

    private handleCommandeRenseignerInformationSecondairesPropositionRepas(commande: RenseignerInformationSecondairesPropositionRepas) {
        this.addEvent(new InformationsSecondairesPropositionRepasRenseignees(commande.idPropositionRepas,
            commande.description,
            commande.heureMaxReservation,
            commande.montantMax,
            commande.livraisonComprise));
    }


    private handleCommandePublierPropositionRepas(commande: PublierPropositionRepas) {
        this.addEvent(new PropositionRepasPubliee(this.aggregateId,
            this.libelle,
            this.description,
            this.heureMaxReservation,
            this.montantMax,
            this.livraisonComprise,
            this.isPrive,
            this.invitations));

    }

    handleEvent(event: Infrastructure.IEvent) {
        switch (event.getEventType()) {
            case Infrastructure.EventType.PropositionRepasDebutee:
                this.handleEventPropositionRepasDebutee(<PropositionRepasDebutee>event);
                break;
            case Infrastructure.EventType.InformationsSecondairesPropositionRepasRenseignees:
                this.handleEventInformationsSecondairesPropositionRepasRenseignees(<InformationsSecondairesPropositionRepasRenseignees>event);
                break;
        }
    }

    private handleEventPropositionRepasDebutee(event: PropositionRepasDebutee) {
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