var Infrastructure = require("../Infrastructure");
var Immutables = require("../../Immutables/Immutables");
var ro = require("../../ReadOnly");
require("should");
var AzureStorageFacade = require("./AzureStorageFacade");
describe("azure Facade >", function () {
    var facade;
    before(function (done) {
        facade = new AzureStorageFacade();
        done();
    });
    it("can connect to Azure", function (done) {
        var facade = new AzureStorageFacade();
        facade.connect(function () {
            done();
        });
    });
    it("can create event table", function (done) {
        var facade = new AzureStorageFacade();
        facade.connect(function () {
            facade.createEventTableIfNeeded(function () {
                done();
            });
        });
    });
    it("can create event table even if it already exists", function (done) {
        var facade = new AzureStorageFacade();
        facade.connect(function () {
            facade.createEventTableIfNeeded(function () {
                facade.createEventTableIfNeeded(function () {
                    done();
                });
            });
        });
    });
    it("can insert event", function (done) {
        var eventAggregateID = new Immutables.Guid();
        facade.connect(function () {
            var event = new TestEvent(eventAggregateID);
            facade.insertEvent(event, done);
        });
    });
    it("can insert and retrieve event", function (done) {
        var eventAggregateID = new Immutables.Guid();
        facade.connect(function () {
            var serializedEvent = new TestEvent(eventAggregateID);
            facade.insertEvent(serializedEvent, function () {
                facade.retrieveEvent(2 /* TestAggregateType */, eventAggregateID, function (deserializedEvent) {
                    deserializedEvent.getAggregateId().should.equal(serializedEvent.getAggregateId());
                    deserializedEvent.getAggregateType().should.equal(serializedEvent.getAggregateType());
                    if (serializedEvent.equals(deserializedEvent)) {
                        done();
                    }
                    else {
                        fail("L'objet sérialisé ne correspond pas à l'évènement désérialisé");
                    }
                });
            });
        });
    });
    after(function (done) {
        done();
    });
});
var TestEvent = (function () {
    function TestEvent(testAggregateID) {
        this.testAggregateID = ro.field(testAggregateID);
    }
    TestEvent.prototype.getAggregateId = function () {
        return this.testAggregateID();
    };
    TestEvent.prototype.getAggregateType = function () {
        return 2 /* TestAggregateType */;
    };
    TestEvent.prototype.equals = function (left) {
        return this.getAggregateId().equals(left.getAggregateId()) && this.getAggregateType() === left.getAggregateType();
    };
    return TestEvent;
})();
