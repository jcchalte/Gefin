/// <reference path="../../../../../Scripts/GlobalReferences.d.ts"/>
import Infrastructure = require("../../../Infrastructure/Infrastructure");
import Login = require("../../Immutables/Utilisateur/Login");
import Immutables = require("../../../Immutables/Immutables");
export = OuvrirCompteUtilisateur
class OuvrirCompteUtilisateur implements Infrastructure.ICommande {

    public idCompteUtilisateur: Immutables.Guid;

    public nomUtilisateur: Login;

    constructor(idCompteUtilisateur: Immutables.Guid, nomUtilisateur: Login) {
        this.idCompteUtilisateur = idCompteUtilisateur;
        this.nomUtilisateur = nomUtilisateur;
    }


    public getAggregateId() {
        return this.idCompteUtilisateur;
    }

    getAssociatedAggregateType(): Infrastructure.Referentiel.AggregateType {
        return Infrastructure.Referentiel.AggregateType.CompteUtilisateur;
    }

    //getCommandType(): Infrastructure.Referentiel.CommandeType {return Infrastructure.Referentiel.CommandeType.OuvrirCompteUtilisateur;}
}