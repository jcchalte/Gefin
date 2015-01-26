/// <reference path="../../../../../Scripts/GlobalReferences.d.ts"/>
var Infrastructure = require("../../../Infrastructure/Infrastructure");

var ro = require("../../../ReadOnly");

var PublierPropositionRepas = (function () {
    function PublierPropositionRepas(idPropositionRepas) {
        this.idPropositionRepas = ro.field(idPropositionRepas);
    }
    PublierPropositionRepas.prototype.getAggregateId = function () {
        return this.idPropositionRepas();
    };

    PublierPropositionRepas.prototype.getAssociatedAggregateType = function () {
        return 1 /* PropositionRepas */;
    };
    return PublierPropositionRepas;
})();
module.exports = PublierPropositionRepas;
