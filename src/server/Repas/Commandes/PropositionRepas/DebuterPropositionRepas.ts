/// <reference path="../../../../../Scripts/GlobalReferences.d.ts"/>
import Libelle = require("../../Immutables/PropositioRepas/Libelle");
import Infrastructure = require("../../../Infrastructure/Infrastructure");
import Immutables = require("../../../Immutables/Immutables");
//import CommandeType = Infrastructure.Referentiel.CommandeType;
export = DebuterPropositionRepas
class DebuterPropositionRepas implements Infrastructure.ICommande{

    public idPropositionRepas: Immutables.Guid;
    public idUtilisateur: Immutables.Guid;
    public libelle: Libelle;
    public invitations: string;
    public isPrive: boolean;
    
    
    constructor(idPropositionRepas: Immutables.Guid, idUtilisateur: Immutables.Guid, libelle: Libelle, isPrive:boolean, invitations:string) {
        this.idPropositionRepas = idPropositionRepas;
        this.idUtilisateur = idUtilisateur;
        this.libelle = libelle;
        this.invitations = invitations;
        this.isPrive = isPrive;
    }

    public getAggregateId() {
        return this.idPropositionRepas;
    }

    getAssociatedAggregateType(): Infrastructure.Referentiel.AggregateType {
        return Infrastructure.Referentiel.AggregateType.PropositionRepas;
    }

    //getCommandType(): CommandeType { return CommandeType.DebuterPropositionRepas; }
}