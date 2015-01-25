/// <reference path="../../../../Scripts/GlobalReferences.d.ts"/>
import Infrastructure = require("../../Infrastructure/Infrastructure");

import CompteUtilisateur = require("../../Aggregate/CompteUtilisateur");

import Login = require("../../Shared/Immutables/Utilisateur/Login");
import Immutables = require("../../Shared/Immutables/Immutables");


export = OuvrirCompteUtilisateur
class OuvrirCompteUtilisateur implements Infrastructure.ICommande{

    private idCompteUtilisateur: Immutables.Guid;

    private nomUtilisateur: Login;
    
    constructor(idCompteUtilisateur: Immutables.Guid, nomUtilisateur: Login) {
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

    getAssociatedAggregate(): Infrastructure.IAggregate {
        return new CompteUtilisateur(this.getAggregateId());
    }
}