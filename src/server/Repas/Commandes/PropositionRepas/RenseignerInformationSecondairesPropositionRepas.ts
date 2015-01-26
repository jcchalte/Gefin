/// <reference path="../../../../../Scripts/GlobalReferences.d.ts"/>

import Infrastructure = require("../../../Infrastructure/Infrastructure");
import Immutables = require("../../../Immutables/Immutables");
//import CommandeType = Infrastructure.Referentiel.CommandeType;
export = RenseignerInformationSecondairesPropositionRepas
class RenseignerInformationSecondairesPropositionRepas implements Infrastructure.ICommande {

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

    public getAggregateId() {
        return this.idPropositionRepas;
    }

    getAssociatedAggregateType(): Infrastructure.Referentiel.AggregateType {
        return Infrastructure.Referentiel.AggregateType.PropositionRepas;
    }

    //getCommandType(): CommandeType { return CommandeType.RenseignerInformationSecondairesPropositionRepas; }
}