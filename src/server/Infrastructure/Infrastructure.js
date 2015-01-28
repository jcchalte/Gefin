var Referentiel;
(function (Referentiel) {
    (function (AggregateType) {
        AggregateType[AggregateType["UserAccount"] = 0] = "UserAccount";
        AggregateType[AggregateType["MealProposal"] = 1] = "MealProposal";
        AggregateType[AggregateType["TestAggregateType"] = 2] = "TestAggregateType";
    })(Referentiel.AggregateType || (Referentiel.AggregateType = {}));
    var AggregateType = Referentiel.AggregateType;
})(Referentiel = exports.Referentiel || (exports.Referentiel = {}));
var ServiceInjection;
(function (ServiceInjection) {
    function injectServices(eventDispatcher, eventRepository, commandDispatcher) {
        IEventDispatcher.eventDispatcher = eventDispatcher;
        IEventRepository.eventRepository = eventRepository;
        ICommandDispatcher.commandDispatcher = commandDispatcher;
    }
    ServiceInjection.injectServices = injectServices;
})(ServiceInjection = exports.ServiceInjection || (exports.ServiceInjection = {}));
function commitEvents(events) {
    IEventRepository.getInstance().commitEvents(events);
    events.forEach(function (event) {
        IEventDispatcher.getInstance().dispatchEvent(event);
    });
}
exports.commitEvents = commitEvents;
var ICommandDispatcher;
(function (ICommandDispatcher) {
    ICommandDispatcher.commandDispatcher;
    function getInstance() {
        return ICommandDispatcher.commandDispatcher;
    }
    ICommandDispatcher.getInstance = getInstance;
})(ICommandDispatcher = exports.ICommandDispatcher || (exports.ICommandDispatcher = {}));
// ReSharper disable once InconsistentNaming
var IEventRepository;
(function (IEventRepository) {
    IEventRepository.eventRepository;
    function getInstance() {
        return IEventRepository.eventRepository;
    }
    IEventRepository.getInstance = getInstance;
})(IEventRepository = exports.IEventRepository || (exports.IEventRepository = {}));
// ReSharper disable once InconsistentNaming
var IEventDispatcher;
(function (IEventDispatcher) {
    IEventDispatcher.eventDispatcher;
    function getInstance() {
        return IEventDispatcher.eventDispatcher;
    }
    IEventDispatcher.getInstance = getInstance;
})(IEventDispatcher = exports.IEventDispatcher || (exports.IEventDispatcher = {}));
var StateBase = (function () {
    function StateBase() {
    }
    StateBase.prototype.callHandleEventDynamically = function (event) {
        var methodName = "handleEvent" + event.constructor.name;
        if (this[methodName] != null) {
            this[methodName](event);
        }
        else {
            console.log(methodName + ' not found');
        }
    };
    return StateBase;
})();
exports.StateBase = StateBase;
