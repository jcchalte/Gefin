(function (Referentiel) {
    (function (AggregateType) {
        AggregateType[AggregateType["CompteUtilisateur"] = 0] = "CompteUtilisateur";
        AggregateType[AggregateType["PropositionRepas"] = 1] = "PropositionRepas";
    })(Referentiel.AggregateType || (Referentiel.AggregateType = {}));
    var AggregateType = Referentiel.AggregateType;
})(exports.Referentiel || (exports.Referentiel = {}));
var Referentiel = exports.Referentiel;

(function (ServiceInjection) {
    function injectServices(eventDispatcher, eventRepository, commandDispatcher) {
        IEventDispatcher.eventDispatcher = eventDispatcher;
        IEventRepository.eventRepository = eventRepository;
        ICommandDispatcher.commandDispatcher = commandDispatcher;
    }
    ServiceInjection.injectServices = injectServices;
})(exports.ServiceInjection || (exports.ServiceInjection = {}));
var ServiceInjection = exports.ServiceInjection;

// ReSharper disable once InconsistentNaming
(function (ICommandDispatcher) {
    ICommandDispatcher.commandDispatcher;

    function getInstance() {
        return ICommandDispatcher.commandDispatcher;
    }
    ICommandDispatcher.getInstance = getInstance;
})(exports.ICommandDispatcher || (exports.ICommandDispatcher = {}));
var ICommandDispatcher = exports.ICommandDispatcher;

// ReSharper disable once InconsistentNaming
(function (IEventRepository) {
    IEventRepository.eventRepository;

    function getInstance() {
        return IEventRepository.eventRepository;
    }
    IEventRepository.getInstance = getInstance;
})(exports.IEventRepository || (exports.IEventRepository = {}));
var IEventRepository = exports.IEventRepository;

// ReSharper disable once InconsistentNaming
(function (IEventDispatcher) {
    IEventDispatcher.eventDispatcher;

    function getInstance() {
        return IEventDispatcher.eventDispatcher;
    }
    IEventDispatcher.getInstance = getInstance;
})(exports.IEventDispatcher || (exports.IEventDispatcher = {}));
var IEventDispatcher = exports.IEventDispatcher;

var StateBase = (function () {
    function StateBase() {
    }
    StateBase.prototype.callHandleEventDynamically = function (event) {
        var methodName = "handleEvent" + event.constructor.name;
        if (this[methodName] != null) {
            this[methodName](event);
        }
    };
    return StateBase;
})();
exports.StateBase = StateBase;
