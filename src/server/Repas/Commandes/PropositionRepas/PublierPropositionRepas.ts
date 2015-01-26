/// <reference path="../../../../../Scripts/GlobalReferences.d.ts"/>
import Infrastructure = require("../../../Infrastructure/Infrastructure");
import Immutables = require("../../../Immutables/Immutables");
import ro = require("../../../ReadOnly");

export = PublierPropositionRepas
class PublierPropositionRepas implements Infrastructure.ICommande{

    public idPropositionRepas: ro.Field<Immutables.Guid>;
    
    constructor(idPropositionRepas: Immutables.Guid) {
        this.idPropositionRepas = ro.field(idPropositionRepas);
    }

    public getAggregateId() {
        return this.idPropositionRepas();
    }

    getAssociatedAggregateType(): Infrastructure.Referentiel.AggregateType {
        return Infrastructure.Referentiel.AggregateType.PropositionRepas;
    }
}