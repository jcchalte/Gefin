var nodeUuid = require("node-uuid");
var Title = (function () {
    function Title(value) {
        this.innerValue = value;
    }
    Title.prototype.value = function () {
        return this.innerValue;
    };
    Title.prototype.equals = function (left) {
        return this.value() === left.value();
    };
    return Title;
})();
exports.Title = Title;
var Guid = (function () {
    function Guid(innerValue) {
        if (innerValue != null) {
            var uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
            if (!uuidRegex.test(innerValue))
                throw Error("invalid UUID");
            this.innerValue = innerValue;
        }
        else {
            this.innerValue = nodeUuid.v4();
        }
    }
    Guid.prototype.value = function () {
        return this.innerValue;
    };
    Guid.prototype.equals = function (other) {
        return this.value() === other.value();
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
var Time = (function () {
    function Time(hour, minutes) {
        this.hours = hour;
        this.minutes = minutes;
    }
    Time.prototype.equals = function (left) {
        return this.hours === left.hours && this.minutes === left.minutes;
    };
    return Time;
})();
exports.Time = Time;
var Euros = (function () {
    function Euros(amount) {
        this.amount = amount;
    }
    Euros.prototype.equals = function (left) {
        return this.amount === left.amount;
    };
    return Euros;
})();
exports.Euros = Euros;
var Login = (function () {
    function Login(value) {
        this.innerValue = value;
    }
    Login.prototype.value = function () {
        return this.innerValue;
    };
    Login.prototype.equals = function (left) {
        return this.value() === left.value();
    };
    return Login;
})();
exports.Login = Login;
