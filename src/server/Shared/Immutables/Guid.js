/// <reference path="../../../../Scripts/GlobalReferences.d.ts"/>
var nodeUuid = require("node-uuid");

var Guid = (function () {
    function Guid(innerValue) {
        if (innerValue != null) {
            var uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
            if (!uuidRegex.test(innerValue))
                throw Error("invalid UUID");
            this.value = innerValue;
        } else {
            this.value = nodeUuid.v4();
        }
    }
    Guid.prototype.innerValue = function () {
        return this.value;
    };

    Guid.prototype.equals = function (other) {
        return this.innerValue() === other.innerValue();
    };
    return Guid;
})();
module.exports = Guid;
