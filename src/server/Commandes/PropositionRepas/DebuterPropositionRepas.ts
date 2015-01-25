/// <reference path="../../../../Scripts/GlobalReferences.d.ts"/>
import Libelle = require("../../Shared/Immutables/PropositioRepas/Libelle");
import Infrastructure = require("../../Infrastructure/Infrastructure");
import Immutables = require("../../Shared/Immutables/Immutables");
import CommandeType = Infrastructure.CommandeType;
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

    getAssociatedAggregateType(): Infrastructure.AggregateType {
        return Infrastructure.AggregateType.PropositionRepas;
    }

    getCommandType(): CommandeType { return CommandeType.DebuterPropositionRepas; }
}