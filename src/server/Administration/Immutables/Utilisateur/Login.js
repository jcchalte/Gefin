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
module.exports = Login;
