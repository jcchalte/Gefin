/// <reference path="../../../../../Scripts/GlobalReferences.d.ts"/>
import ro = require("../../../ReadOnly");
import Infrastructure = require("../../../Infrastructure/Infrastructure");
import Login = require("../../Immutables/Utilisateur/Login");
import Immutables = require("../../../Immutables/Immutables");
export = OuvrirCompteUtilisateur
class OuvrirCompteUtilisateur implements Infrastructure.ICommande {

    public idCompteUtilisateur: ro.Field<Immutables.Guid>;

    public nomUtilisateur: ro.Field<Login>;

    constructor(idCompteUtilisateur: Immutables.Guid, nomUtilisateur: Login) {
        this.idCompteUtilisateur =ro.field(idCompteUtilisateur);
        this.nomUtilisateur = ro.field(nomUtilisateur);
    }


    public getAggregateId() {
        return this.idCompteUtilisateur();
    }

    getAssociatedAggregateType(): Infrastructure.Referentiel.AggregateType {
        return Infrastructure.Referentiel.AggregateType.CompteUtilisateur;
    }
}