import Infrastructure = require("../Infrastructure");
import Immutables = require("../../Immutables/Immutables");
import ro = require("../../ReadOnly");
import assert = require("assert");
require("should");
import AzureStorageFacade = require("./AzureStorageFacade");

describe("azure Facade >",() => {
    var facade: AzureStorageFacade;

    before((done) => {
        facade = new AzureStorageFacade();
        done();
    });

    it("can connect to Azure",(done) => {
        var facade = new AzureStorageFacade();
        facade.connect(() => {
            done();
        });
    });

    it("can create event table",(done) => {
        var facade = new AzureStorageFacade();
        facade.connect(() => {
            facade.createEventTableIfNeeded(() => {
                done();
            });
        });
    });

    it("can create event table even if it already exists",(done) => {
        var facade = new AzureStorageFacade();
        facade.connect(() => {
            facade.createEventTableIfNeeded(() => {
                facade.createEventTableIfNeeded(() => {
                    done();
                });
            });
        });
    });

    it("can insert event",(done) => {
        var eventAggregateID = new Immutables.Guid();
        facade.connect(() => {
            var event: Infrastructure.IEvent = new TestEvent(eventAggregateID);

            facade.insertEvent(event, done);
        });
    });


    it("can insert and retrieve event",(done) => {
        var eventAggregateID = new Immutables.Guid();
        facade.connect(() => {
            var serializedEvent = new TestEvent(eventAggregateID);

            facade.insertEvent(serializedEvent,() => {
                facade.retrieveEvent(Infrastructure.Referentiel.AggregateType.TestAggregateType, eventAggregateID,(deserializedEvent: Infrastructure.IEvent) => {
                    deserializedEvent.getAggregateId().should.equal(serializedEvent.getAggregateId());
                    deserializedEvent.getAggregateType().should.equal(serializedEvent.getAggregateType());
                    if (serializedEvent.equals(deserializedEvent)) {
                        done();
                    } else {
                        fail("L'objet sérialisé ne correspond pas à l'évènement désérialisé");
                    }
                });
            });
        });
    });
    after((done) => {
        done();
    });
});

class TestEvent implements Infrastructure.IEvent {
    testAggregateID: ro.Field<Immutables.Guid>;

    constructor(testAggregateID: Immutables.Guid) {
        this.testAggregateID = ro.field(testAggregateID);
    }
    getAggregateId(): Immutables.Guid { return this.testAggregateID(); }

    getAggregateType(): Infrastructure.Referentiel.AggregateType { return Infrastructure.Referentiel.AggregateType.TestAggregateType; }

    equals(left: Infrastructure.IEvent): boolean {
        return this.getAggregateId().equals(left.getAggregateId())
            && this.getAggregateType() === left.getAggregateType();
    }

}