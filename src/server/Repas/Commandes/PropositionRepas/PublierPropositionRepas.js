/// <reference path="../../../../../Scripts/GlobalReferences.d.ts"/>
var Infrastructure = require("../../../Infrastructure/Infrastructure");

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
    return PublierPropositionRepas;
})();
module.exports = PublierPropositionRepas;
