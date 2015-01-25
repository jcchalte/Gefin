var AggregateRepository = require("./AggregateRepository");


var IAggregateRepository;
(function (IAggregateRepository) {
    var aggregateRepository = new AggregateRepository();

    function getInstance() {
        return aggregateRepository;
    }
    IAggregateRepository.getInstance = getInstance;
})(IAggregateRepository || (IAggregateRepository = {}));
module.exports = IAggregateRepository;
