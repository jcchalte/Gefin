/// <reference path="../../../../../Scripts/GlobalReferences.d.ts"/>
import Infrastructure = require("../../../Infrastructure/Infrastructure");
import Immutables = require("../../../Immutables/Immutables");
import ro = require("../../../ReadOnly");

export = InformationsSecondairesPropositionRepasRenseignees
class InformationsSecondairesPropositionRepasRenseignees implements Infrastructure.IEvent {

    public idPropositionRepas: ro.Field<Immutables.Guid>;
    public description: ro.Field<Immutables.Description>;
    public heureMaxReservation: ro.Field<Immutables.Heure>;
    public montantMax: ro.Field<Immutables.Euros>;
    public livraisonComprise: ro.Field<boolean>;


    constructor(idPropositionRepas: Immutables.Guid, description: Immutables.Description, heureMaxReservation: Immutables.Heure, montantMax: Immutables.Euros, livraisonComprise: boolean) {
        this.idPropositionRepas = ro.field(idPropositionRepas);
        this.description = ro.field(description);
        this.heureMaxReservation = ro.field(heureMaxReservation);
        this.montantMax = ro.field(montantMax);
        this.livraisonComprise = ro.field(livraisonComprise);
    }


    equals(left: InformationsSecondairesPropositionRepasRenseignees): boolean {
        return this.idPropositionRepas.equals(left.idPropositionRepas)
            && this.description.equals(left.description)
            && this.heureMaxReservation.equals(left.heureMaxReservation)
            && this.montantMax.equals(left.montantMax)
            && this.livraisonComprise.equals(left.livraisonComprise);
    }

    getAggregateId(): Immutables.Guid { return this.idPropositionRepas(); }
}