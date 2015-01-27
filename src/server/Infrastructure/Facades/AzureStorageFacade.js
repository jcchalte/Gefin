var azure = require('azure-storage');
var Infrastructure = require("../Infrastructure");
var Configuration;
(function (Configuration) {
    Configuration.EVENT_STORE_TABLE_NAME = "eventStore";
})(Configuration || (Configuration = {}));
var AzureStorageFacade = (function () {
    function AzureStorageFacade() {
    }
    AzureStorageFacade.prototype.connect = function (done) {
        this.tableSvc = azure.createTableService(azure.generateDevelopmentStorageCredendentials());
        done();
    };
    AzureStorageFacade.prototype.createEventTableIfNeeded = function (done) {
        this.tableSvc.createTableIfNotExists(Configuration.EVENT_STORE_TABLE_NAME, function (error, result, response) {
            if (!error)
                done();
        });
    };
    AzureStorageFacade.prototype.insertEvent = function (event, done) {
        this.tableSvc.insertEntity(Configuration.EVENT_STORE_TABLE_NAME, Helpers.getAzureEntityFromEvent(event), function (error, etag, response) {
            if (!error)
                done();
            else
                throw error;
        });
    };
    AzureStorageFacade.prototype.retrieveEvent = function (aggregateType, aggregateID, callback) {
        console.log("Searching for PK " + Infrastructure.Referentiel.AggregateType[aggregateType] + " RK " + aggregateID.value());
        this.tableSvc.retrieveEntity(Configuration.EVENT_STORE_TABLE_NAME, Infrastructure.Referentiel.AggregateType[aggregateType], aggregateID.value(), function (error, result) {
            if (!error) {
                var event = {
                    getAggregateId: function () {
                        return aggregateID;
                    },
                    getAggregateType: function () {
                        return aggregateType;
                    },
                    equals: function (left) {
                        return true;
                    }
                };
                callback(event);
            }
            else
                throw error;
        });
    };
    return AzureStorageFacade;
})();
var Helpers;
(function (Helpers) {
    function getAzureEntityFromEvent(event) {
        var result = {
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
    Helpers.getAzureEntityFromEvent = getAzureEntityFromEvent;
})(Helpers || (Helpers = {}));
module.exports = AzureStorageFacade;
