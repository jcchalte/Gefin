var ReadOnly;
(function (ReadOnly) {
    function field(value) {
        var result = (function () {
            return value;
        });
        result.equals = function (left) {
            if (value['equals'])
                return value['equals'](left());
            else
                return value === left();
        };
        return result;
    }
    ReadOnly.field = field;
})(ReadOnly || (ReadOnly = {}));
module.exports = ReadOnly;
