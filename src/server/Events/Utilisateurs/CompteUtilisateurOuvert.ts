/// <reference path="../../../../Scripts/GlobalReferences.d.ts"/>
import Infrastructure = require("../../Infrastructure/Infrastructure");
import Login = require("../../Shared/Immutables/Utilisateur/Login");
import Immutables = require("../../Shared/Immutables/Immutables");

export = CompteUtilisateurOuvert
class CompteUtilisateurOuvert implements Infrastructure.IEvent {
    private idCompteUtilisateur: Immutables.Guid;
    private nomUtilisateur: Login;

    constructor(idCompteUtilisateur: Immutables.Guid, nomUtilisateur: Login) {
        this.idCompteUtilisateur = idCompteUtilisateur;
        this.nomUtilisateur = nomUtilisateur;
    }

    public getNomUtilisateur() {
        return this.getNomUtilisateur();
    }

    equals(left: Infrastructure.IEvent): boolean {
        return true;
    }

    getAggregateId(): Immutables.Guid { return this.idCompteUtilisateur; }

    getEventName(): Infrastructure.EventName { return new Infrastructure.EventName("CompteUtilisateurOuvert"); }
}