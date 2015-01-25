import Immutables = require("../Shared/Immutables/Immutables");

export enum AggregateType
{
    CompteUtilisateur,
    PropositionRepas
}

export enum CommandeType {
    OuvrirCompteUtilisateur,
    DebuterPropositionRepas,
    RenseignerInformationSecondairesPropositionRepas,
    PublierPropositionRepas
}

export enum EventType {
    CompteUtilisateurOuvert,
    PropositionRepasDebutee,
    InformationsSecondairesPropositionRepasRenseignees,
    PropositionRepasPubliee
}

export interface IEvent {
    getEventType(): EventType;
    getAggregateId(): Immutables.Guid;
    equals(left: IEvent): boolean;
}

export interface IAggregate
{
    handleCommande(commande: ICommande);

    handleEvent(event: IEvent);

    popEventsToCommit(): Array<IEvent>;
}



export interface ICommande {
    getAggregateId(): Immutables.Guid;
    getAssociatedAggregateType(): AggregateType;
    getCommandType(): CommandeType;
}

