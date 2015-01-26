﻿/// <reference path="../../../../../Scripts/GlobalReferences.d.ts"/>
import Infrastructure = require("../../../Infrastructure/Infrastructure");
import Immutables = require("../../../Immutables/Immutables");
//import CommandeType = Infrastructure.Referentiel.CommandeType;
export = PublierPropositionRepas
class PublierPropositionRepas implements Infrastructure.ICommande{

    public idPropositionRepas: Immutables.Guid;
    
    constructor(idPropositionRepas: Immutables.Guid) {
        this.idPropositionRepas = idPropositionRepas;
    }

    public getAggregateId() {
        return this.idPropositionRepas;
    }

    getAssociatedAggregateType(): Infrastructure.Referentiel.AggregateType {
        return Infrastructure.Referentiel.AggregateType.PropositionRepas;
    }

    //getCommandType(): CommandeType { return CommandeType.PublierPropositionRepas; }
}