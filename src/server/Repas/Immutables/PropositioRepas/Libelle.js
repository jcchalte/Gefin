var Libelle = (function () {
    function Libelle(value) {
        this.innerValue = value;
    }
    Libelle.prototype.value = function () {
        return this.innerValue;
    };

    Libelle.prototype.equals = function (left) {
        return this.value() === left.value();
    };
    return Libelle;
})();
module.exports = Libelle;
