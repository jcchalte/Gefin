/// <reference path="../../../../../Scripts/GlobalReferences.d.ts"/>
import ro = require("../../../ReadOnly");
import Infrastructure = require("../../../Infrastructure/Infrastructure");
import Login = require("../../Immutables/Utilisateur/Login");
import Immutables = require("../../../Immutables/Immutables");

export = CompteUtilisateurOuvert
class CompteUtilisateurOuvert implements Infrastructure.IEvent {

    public idCompteUtilisateur: ro.Field<Immutables.Guid>;
    public nomUtilisateur: ro.Field<Login>;

    constructor(idCompteUtilisateur: Immutables.Guid, nomUtilisateur: Login) {
        this.idCompteUtilisateur = ro.field(idCompteUtilisateur);
        this.nomUtilisateur = ro.field(nomUtilisateur);
    }

    equals(left: CompteUtilisateurOuvert): boolean {
        return this.idCompteUtilisateur.equals(left.idCompteUtilisateur)
            && this.nomUtilisateur.equals(left.nomUtilisateur);
    }

    getAggregateId(): Immutables.Guid { return this.idCompteUtilisateur(); }
}