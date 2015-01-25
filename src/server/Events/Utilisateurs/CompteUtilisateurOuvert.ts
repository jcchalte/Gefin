/// <reference path="../../../../Scripts/GlobalReferences.d.ts"/>
import IEvent = require("../Base/IEvent");
import Login = require("../../Shared/Immutables/Utilisateur/Login");
import Guid = require("../../Shared/Immutables/Guid");

export = CompteUtilisateurOuvert
class CompteUtilisateurOuvert implements IEvent {
    private idCompteUtilisateur: Guid;
    private nomUtilisateur: Login;

    constructor(idCompteUtilisateur: Guid, nomUtilisateur: Login) {
        this.idCompteUtilisateur = idCompteUtilisateur;
        this.nomUtilisateur = nomUtilisateur;
    }

    public getNomUtilisateur() {
        return this.getNomUtilisateur();
    }

    equals(left: IEvent): boolean {
        return true;
    }

    getAggregateId(): Guid { return this.idCompteUtilisateur; }
}