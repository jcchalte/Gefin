/// <reference path="../../../../../Scripts/GlobalReferences.d.ts"/>
import Infrastructure = require("../../../Infrastructure/Infrastructure");
import Immutables = require("../../../Immutables/Immutables");

export = InformationsSecondairesPropositionRepasRenseignees
class InformationsSecondairesPropositionRepasRenseignees implements Infrastructure.IEvent {

    public idPropositionRepas: Immutables.Guid;
    public description: Immutables.Description;
    public heureMaxReservation: Immutables.Heure;
    public montantMax: Immutables.Euros;
    public livraisonComprise: boolean;


    constructor(idPropositionRepas: Immutables.Guid, description: Immutables.Description, heureMaxReservation: Immutables.Heure, montantMax: Immutables.Euros, livraisonComprise: boolean) {
        this.idPropositionRepas = idPropositionRepas;
        this.description = description;
        this.heureMaxReservation = heureMaxReservation;
        this.montantMax = montantMax;
        this.livraisonComprise = livraisonComprise;
    }


    equals(left: InformationsSecondairesPropositionRepasRenseignees): boolean {
        return this.idPropositionRepas.equals(left.idPropositionRepas)
            && this.description.equals(left.description)
            && this.heureMaxReservation.equals(left.heureMaxReservation)
            && this.montantMax.equals(left.montantMax)
            && this.livraisonComprise === left.livraisonComprise;
    }

    getAggregateId(): Immutables.Guid { return this.idPropositionRepas; }

    //getEventType(): Infrastructure.Referentiel.EventType { return Infrastructure.Referentiel.EventType.InformationsSecondairesPropositionRepasRenseignees; }
}