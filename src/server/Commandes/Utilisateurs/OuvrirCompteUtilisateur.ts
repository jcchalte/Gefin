/// <reference path="../../../../Scripts/GlobalReferences.d.ts"/>
import CompteUtilisateur = require("../../Aggregate/CompteUtilisateur");
import IAggregate = require("../../Infrastructure/IAggregate");
import ICommande = require("../Base/ICommande");

import Login = require("../../Shared/Immutables/Utilisateur/Login");
import Guid = require("../../Shared/Immutables/Guid");


export = OuvrirCompteUtilisateur
class OuvrirCompteUtilisateur implements ICommande{

    private idCompteUtilisateur: Guid;

    private nomUtilisateur: Login;
    
    constructor(idCompteUtilisateur: Guid, nomUtilisateur: Login) {
        this.idCompteUtilisateur = idCompteUtilisateur;
        this.nomUtilisateur = nomUtilisateur;
    }

    public getIdCompteUtilisateur() {
        return this.idCompteUtilisateur;
    }

    public getNomUtilisateur() {
        return this.nomUtilisateur;
    }

    public getAggregateId() {
        return this.idCompteUtilisateur;
    }

    getAssociatedAggregate(): IAggregate {
        return new CompteUtilisateur(this.getAggregateId());
    }
}