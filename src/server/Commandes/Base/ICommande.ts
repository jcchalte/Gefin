/// <reference path="../../../../Scripts/GlobalReferences.d.ts"/>
import IAggregate = require("../../Infrastructure/IAggregate");
import Guid = require("../../Shared/Immutables/Guid");
export = ICommande
interface ICommande {
    getAggregateId(): Guid;

    getAssociatedAggregate() : IAggregate;
}