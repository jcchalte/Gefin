/// <reference path="../../../../../Scripts/GlobalReferences.d.ts"/>
import Libelle = require("../../Immutables/PropositioRepas/Libelle");
import Infrastructure = require("../../../Infrastructure/Infrastructure");
import Immutables = require("../../../Immutables/Immutables");
import ro = require("../../../ReadOnly");

export = PropositionRepasPubliee
class PropositionRepasPubliee implements Infrastructure.IEvent {

    public idPropositionRepas: ro.Field<Immutables.Guid>;
    public libelle: ro.Field<Libelle>;
    public description: ro.Field<Immutables.Description>;
    public heureMaxReservation: ro.Field<Immutables.Heure>;
    public montantMax: ro.Field<Immutables.Euros>;
    public livraisonComprise: ro.Field<boolean>;
    public isPrive: ro.Field<boolean>;
    public invitations: ro.Field<string>;


    constructor(idPropositionRepas: Immutables.Guid,libelle: Libelle,description: Immutables.Description, heureMaxReservation: Immutables.Heure, montantMax: Immutables.Euros, livraisonComprise: boolean, isPrive: boolean,invitations: string) {
        this.idPropositionRepas = ro.field(idPropositionRepas);
        this.libelle = ro.field(libelle);
        this.description = ro.field(description);
        this.heureMaxReservation = ro.field(heureMaxReservation);
        this.montantMax = ro.field(montantMax);
        this.livraisonComprise = ro.field(livraisonComprise);
        this.isPrive = ro.field(isPrive);
        this.invitations = ro.field(invitations);
    }


    equals(left: PropositionRepasPubliee): boolean {
        return this.idPropositionRepas.equals(left.idPropositionRepas)
            && this.libelle.equals(left.libelle)
            && this.description.equals(left.description)
            && this.heureMaxReservation.equals(left.heureMaxReservation)
            && this.montantMax.equals(left.montantMax)
            && this.livraisonComprise.equals(left.livraisonComprise)
            && this.isPrive.equals(left.isPrive)
            && this.invitations.equals(left.invitations);
    }

    getAggregateId(): Immutables.Guid { return this.idPropositionRepas(); }

    getAggregateType(): Infrastructure.Referentiel.AggregateType { return Infrastructure.Referentiel.AggregateType.PropositionRepas; }
}