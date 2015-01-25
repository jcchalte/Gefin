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
module.exports = Titre;
