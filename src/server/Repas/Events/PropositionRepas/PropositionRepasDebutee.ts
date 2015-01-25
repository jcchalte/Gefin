/// <reference path="../../../../../Scripts/GlobalReferences.d.ts"/>
import Libelle = require("../../Immutables/PropositioRepas/Libelle");
import Infrastructure = require("../../../Infrastructure/Infrastructure");
import Immutables = require("../../../Immutables/Immutables");

export = PropositionRepasDebutee
class PropositionRepasDebutee implements Infrastructure.IEvent {

    public idPropositionRepas: Immutables.Guid;
    public idUtilisateur: Immutables.Guid;
    public libelle: Libelle;
    public invitations: string;
    public isPrive: boolean;

    constructor(idPropositionRepas: Immutables.Guid, idUtilisateur: Immutables.Guid, libelle: Libelle, isPrive: boolean, invitations: string) {
        this.idPropositionRepas = idPropositionRepas;
        this.idUtilisateur = idUtilisateur;
        this.libelle = libelle;
        this.invitations = invitations;
        this.isPrive = isPrive;
    }


    equals(left: PropositionRepasDebutee): boolean {
        return this.idPropositionRepas.equals(left.idPropositionRepas)
            && this.idUtilisateur.equals(left.idUtilisateur)
            && this.libelle.equals(left.libelle)
            && this.invitations === left.invitations
            && this.isPrive === left.isPrive;
    }

    getAggregateId(): Immutables.Guid { return this.idPropositionRepas; }

    getEventType(): Infrastructure.EventType { return Infrastructure.EventType.PropositionRepasDebutee; }
}