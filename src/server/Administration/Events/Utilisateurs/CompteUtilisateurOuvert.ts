/// <reference path="../../../../../Scripts/GlobalReferences.d.ts"/>
import Infrastructure = require("../../../Infrastructure/Infrastructure");
import Login = require("../../Immutables/Utilisateur/Login");
import Immutables = require("../../../Immutables/Immutables");

export = CompteUtilisateurOuvert
class CompteUtilisateurOuvert implements Infrastructure.IEvent {
    public idCompteUtilisateur: Immutables.Guid;
    public nomUtilisateur: Login;

    constructor(idCompteUtilisateur: Immutables.Guid, nomUtilisateur: Login) {
        this.idCompteUtilisateur = idCompteUtilisateur;
        this.nomUtilisateur = nomUtilisateur;
    }

    equals(left: CompteUtilisateurOuvert): boolean {
        return this.idCompteUtilisateur.equals(left.idCompteUtilisateur)
            && this.nomUtilisateur.equals(left.nomUtilisateur);
    }

    getAggregateId(): Immutables.Guid { return this.idCompteUtilisateur; }

    //getEventType(): Infrastructure.Referentiel.EventType { return Infrastructure.Referentiel.EventType.CompteUtilisateurOuvert; }
}