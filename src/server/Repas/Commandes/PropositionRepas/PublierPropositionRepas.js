/// <reference path="../../../../../Scripts/GlobalReferences.d.ts"/>
var Infrastructure = require("../../../Infrastructure/Infrastructure");

var CommandeType = Infrastructure.CommandeType;
var PublierPropositionRepas = (function () {
    function PublierPropositionRepas(idPropositionRepas) {
        this.idPropositionRepas = idPropositionRepas;
    }
    PublierPropositionRepas.prototype.getAggregateId = function () {
        return this.idPropositionRepas;
    };

    PublierPropositionRepas.prototype.getAssociatedAggregateType = function () {
        return 1 /* PropositionRepas */;
    };

    PublierPropositionRepas.prototype.getCommandType = function () {
        return 3 /* PublierPropositionRepas */;
    };
    return PublierPropositionRepas;
})();
module.exports = PublierPropositionRepas;
