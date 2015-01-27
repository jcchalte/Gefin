/// <reference path="../../../../../Scripts/GlobalReferences.d.ts"/>
import Libelle = require("../../Immutables/PropositioRepas/Libelle");
import Infrastructure = require("../../../Infrastructure/Infrastructure");
import Immutables = require("../../../Immutables/Immutables");
import ro = require("../../../ReadOnly");

export = PropositionRepasDebutee
class PropositionRepasDebutee implements Infrastructure.IEvent {

    public idPropositionRepas: ro.Field<Immutables.Guid>;
    public idUtilisateur: ro.Field<Immutables.Guid>;
    public libelle: ro.Field<Libelle>;
    public invitations: ro.Field<string>;
    public isPrive: ro.Field<boolean>;

    constructor(idPropositionRepas: Immutables.Guid, idUtilisateur: Immutables.Guid, libelle: Libelle, isPrive: boolean, invitations: string) {
        this.idPropositionRepas = ro.field(idPropositionRepas);
        this.idUtilisateur = ro.field(idUtilisateur);
        this.libelle = ro.field(libelle);
        this.invitations = ro.field(invitations);
        this.isPrive = ro.field(isPrive);
    }


    equals(left: PropositionRepasDebutee): boolean {
        return this.idPropositionRepas.equals(left.idPropositionRepas)
            && this.idUtilisateur.equals(left.idUtilisateur)
            && this.libelle.equals(left.libelle)
            && this.invitations.equals(left.invitations)
            && this.isPrive.equals(left.isPrive);
    }

    getAggregateId(): Immutables.Guid { return this.idPropositionRepas(); }

    getAggregateType(): Infrastructure.Referentiel.AggregateType { return Infrastructure.Referentiel.AggregateType.PropositionRepas; }
}