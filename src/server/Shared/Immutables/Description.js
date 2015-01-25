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
module.exports = Description;
