export = AzureStorageFacade;
import azure = require('azure-storage');
import Immutables = require("../../Immutables/Immutables");
import Infrastructure = require("../Infrastructure");

module Configuration {
    export var EVENT_STORE_TABLE_NAME: string = "eventStore";
}

class AzureStorageFacade {

    private tableSvc: azure.IAzureTableService;

    connect(done: () => void) {
        this.tableSvc = azure.createTableService(azure.generateDevelopmentStorageCredendentials());
        done();
    }

    createEventTableIfNeeded(done: () => void) {
        this.tableSvc.createTableIfNotExists(Configuration.EVENT_STORE_TABLE_NAME,(error, result, response) => {
            if (!error)
                done();
        });
    }

    insertEvent(event: Infrastructure.IEvent, done: () => void) {
        this.tableSvc.insertEntity(Configuration.EVENT_STORE_TABLE_NAME, Helpers.getAzureEntityFromEvent(event),(error, etag, response) => {
            if (!error)
                done();
            else throw error;
        });
    }

    retrieveEvent(aggregateType: Infrastructure.Referentiel.AggregateType, aggregateID: Immutables.Guid, callback: (event: Infrastructure.IEvent) => void) {
        console.log("Searching for PK " + Infrastructure.Referentiel.AggregateType[aggregateType] + " RK " + aggregateID.value());

        this.tableSvc.retrieveEntity(Configuration.EVENT_STORE_TABLE_NAME, Infrastructure.Referentiel.AggregateType[aggregateType], aggregateID.value(), (error, result) => {
            if (!error) {
                var event: Infrastructure.IEvent = {
                    getAggregateId() {
                        return aggregateID;
                    },
                    getAggregateType() {
                        return aggregateType;
                    },
                    equals(left: Infrastructure.IEvent) {
                        return true;
                    }
                };

                callback(event);
            } else throw error;
        });
    }
}

module Helpers {
    export function getAzureEntityFromEvent(event: Infrastructure.IEvent): azure.IAzureStorageEntity {
        var result= {
            PartitionKey: azure.TableUtilities.entityGenerator.String(Infrastructure.Referentiel.AggregateType[event.getAggregateType()]),
            RowKey: azure.TableUtilities.entityGenerator.String(event.getAggregateId().value()),
            Serialisation: {}
        };

        var jsonObject = {};
        for (var fieldName in event) {
            if (event.hasOwnProperty(fieldName)) {
                var field = event[fieldName];
                if (field.isReadOnly) {
                    console.log("found field " + fieldName);
                    var readOnlyInnerValue = field();
                    var value = readOnlyInnerValue["value"] != null ? readOnlyInnerValue['value']() : readOnlyInnerValue;
                    jsonObject[fieldName] = value;
                }
            }
        }
        var json = JSON.stringify(jsonObject);
        result.Serialisation = azure.TableUtilities.entityGenerator.String(json);
        return result;
    }
}

