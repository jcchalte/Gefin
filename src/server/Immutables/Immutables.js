var nodeUuid = require("node-uuid");

var Titre = (function () {
    function Titre(value) {
        this.innerValue = value;
    }
    Titre.prototype.value = function () {
        return this.innerValue;
    };

    Titre.prototype.equals = function (left) {
        return this.value() === left.value();
    };
    return Titre;
})();
exports.Titre = Titre;

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
exports.Guid = Guid;

var Description = (function () {
    function Description(value) {
        this.innerValue = value;
    }
    Description.prototype.value = function () {
        return this.innerValue;
    };

    Description.prototype.equals = function (left) {
        return this.value() === left.value();
    };
    return Description;
})();
exports.Description = Description;

var Heure = (function () {
    function Heure(heure, minutes) {
        this.heure = heure;
        this.minutes = minutes;
    }
    Heure.prototype.equals = function (left) {
        return this.heure === left.heure && this.minutes === left.minutes;
    };
    return Heure;
})();
exports.Heure = Heure;

var Euros = (function () {
    function Euros(montant) {
        this.montant = montant;
    }
    Euros.prototype.equals = function (left) {
        return this.montant === left.montant;
    };
    return Euros;
})();
exports.Euros = Euros;
