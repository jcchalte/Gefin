/// <reference path="../../../../Scripts/GlobalReferences.d.ts"/>
import Libelle = require("../../Shared/Immutables/PropositioRepas/Libelle");
import Infrastructure = require("../../Infrastructure/Infrastructure");
import Immutables = require("../../Shared/Immutables/Immutables");

export = PropositionRepasPubliee
class PropositionRepasPubliee implements Infrastructure.IEvent {

    public idPropositionRepas: Immutables.Guid;
    public libelle: Libelle;
    public description: Immutables.Description;
    public heureMaxReservation: Immutables.Heure;
    public montantMax: Immutables.Euros;
    public livraisonComprise: boolean;
    public isPrive: boolean;
    public invitations: string;


    constructor(idPropositionRepas: Immutables.Guid,libelle: Libelle,description: Immutables.Description, heureMaxReservation: Immutables.Heure, montantMax: Immutables.Euros, livraisonComprise: boolean, isPrive: boolean,invitations: string) {
        this.idPropositionRepas = idPropositionRepas;
        this.libelle = libelle;
        this.description = description;
        this.heureMaxReservation = heureMaxReservation;
        this.montantMax = montantMax;
        this.livraisonComprise = livraisonComprise;
        this.isPrive = isPrive;
        this.invitations = invitations;
    }


    equals(left: PropositionRepasPubliee): boolean {
        return this.idPropositionRepas.equals(left.idPropositionRepas)
            && this.libelle.equals(left.libelle)
            && this.description.equals(left.description)
            && this.heureMaxReservation.equals(left.heureMaxReservation)
            && this.montantMax.equals(left.montantMax)
            && this.livraisonComprise === left.livraisonComprise
            && this.isPrive === left.isPrive
            && this.invitations === left.invitations;
    }

    getAggregateId(): Immutables.Guid { return this.idPropositionRepas; }

    getEventType(): Infrastructure.EventType { return Infrastructure.EventType.PropositionRepasPubliee; }
}