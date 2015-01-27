import Immutables = require("../Immutables/Immutables");

export module Referentiel {
    export enum AggregateType {
        CompteUtilisateur,
        PropositionRepas
    }

    //export enum CommandeType {
    //    OuvrirCompteUtilisateur,
    //    DebuterPropositionRepas,
    //    RenseignerInformationSecondairesPropositionRepas,
    //    PublierPropositionRepas
    //}

    //export enum EventType {
    //    CompteUtilisateurOuvert,
    //    PropositionRepasDebutee,
    //    InformationsSecondairesPropositionRepasRenseignees,
    //    PropositionRepasPubliee
    //}
}

export module ServiceInjection {
    export function injectServices(eventDispatcher: IEventDispatcher, eventRepository: IEventRepository, commandDispatcher: ICommandDispatcher) {
        IEventDispatcher.eventDispatcher = eventDispatcher;
        IEventRepository.eventRepository = eventRepository;
        ICommandDispatcher.commandDispatcher = commandDispatcher;
    }
}


export interface IEvent {
    //getEventType(): Referentiel.EventType;
    getAggregateId(): Immutables.Guid;
    equals(left: IEvent): boolean;
}

export interface ICommande {
    //getAggregateId(): Immutables.Guid;
    getAssociatedAggregateType(): Referentiel.AggregateType;
    //getCommandType(): Referentiel.CommandeType;
}

export function commitEvents(events: IEvent[]) {
    IEventRepository.getInstance().commitEvents(events);
    events.forEach((event) => {
        IEventDispatcher.getInstance().dispatchEvent(event);
    });
}

export interface ICommandDispatcher {
    dispatchCommand(commande: ICommande): void;
}

// ReSharper disable once InconsistentNaming
export module ICommandDispatcher {
    export var commandDispatcher: ICommandDispatcher;

    export function getInstance(): ICommandDispatcher {
        return commandDispatcher;
    }
}

export interface IEventRepository {
    getEventsForAggregate(aggregateId: Immutables.Guid): Array<IEvent>;
    commitEvents(events: Array<IEvent>): void;
}
// ReSharper disable once InconsistentNaming
export module IEventRepository {

    export var eventRepository: IEventRepository;

    export function getInstance(): IEventRepository {
        return eventRepository;
    }
}

export interface IEventDispatcher {
    registerToEvent(eventConstructor: Function, callback: (event: IEvent) => void): void;

    unregisterToEvent(eventConstructor: Function, callback: (event: IEvent) => void): void;

    dispatchEvent(event: IEvent): void;
}
// ReSharper disable once InconsistentNaming
export module IEventDispatcher {
    export var eventDispatcher: IEventDispatcher;

    export function getInstance(): IEventDispatcher {
        return eventDispatcher;
    }
}


export class StateBase {
    public callHandleEventDynamically(event: IEvent) {
        var methodName = "handleEvent" + (<any>event.constructor).name;
        if (this[methodName] != null) {
            this[methodName](event);
        } else {
            console.log(methodName+' non trouvé');
        }
    }
}