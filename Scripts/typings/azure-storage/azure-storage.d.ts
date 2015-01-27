declare module "azure-storage" {
    function createTableService(storageAccountOrConnectionString?: string, storageAccessKey?: string, host?: string|any): IAzureTableService;

    export interface IAzureTableService {
        createTableIfNotExists(tableName: string, callback: (error: Error, result: boolean, response: any) => void);
        deleteTable(tableName: string, callback: (error: Error, response: any) => void);
        deleteTableIfExists(tableName: string, callback: (error: Error, response: any) => void);
        withFilter(filter: IAzureStorageFilter);
        insertEntity(tableName: string, entity: IAzureStorageEntity, callback: (error: Error, etag: string, response: any) => void);
        updateEntity(tableName: string, entity: IAzureStorageEntity, callback: (error: Error, etag: string, response: any) => void);
        mergeEntity(tableName: string, entity: IAzureStorageEntity, callback: (error: Error, etag: string, response: any) => void);
        insertOrReplaceEntity(tableName: string, entity: IAzureStorageEntity, callback: (error: Error, etag: string, response: any) => void);
        insertOrMergeEntity(tableName: string, entity: IAzureStorageEntity, callback: (error: Error, etag: string, response: any) => void);
        executeBatch(tableName: string, batch: TableBatch, callback: (error: Error, etag: string, response: any) => void);
        deleteEntity(tableName: string, entity: IAzureStorageEntity, callback: (error: Error, response: any) => void);


        retrieveEntity(tableName: string, primaryKey: string, rowKey: string, callback: (error: Error, result: IAzureStorageEntity, response: any) => void);
        queryEntities(tableName: string, query: TableQuery, continuationToken: IAzureContinuationToken, callback: (error: Error, result: { entries: Array<IAzureStorageEntity>; continuationToken: IAzureContinuationToken; }, response: any) => void)
    }

    export interface IAzureContinuationToken {

    }
    export interface IAzureStorageFilter {
        handle(requestOptions, next);
    }

    export class TableQuery {
        top(amount: number): TableQuery;
        where(query: string, param: string): TableQuery;
        and(query: string, param: string): TableQuery;
        or(query: string, param: string): TableQuery;
        select(columns: Array<string>): TableQuery;
    }

    export class TableBatch {
        insertEntity(entity: IAzureStorageEntity, args: { echoContent: boolean });
        clear(); 
        /*
        getOperations();
        removeOperations()
        */
        hasOperations(): boolean;
        size(): number;

    }

    export interface IAzureKey {
        '_': string;
    }

    export interface IAzureStorageEntity {
        PartitionKey: IAzureKey;
        RowKey: IAzureKey;
    }









    export module TableUtilities {
        export interface IAzureStorageEntityGenerator {
            String(value: string): IAzureKey;
            DateTime(value: Date): IAzureKey;
            Guid(value:string): IAzureKey;
        }

        export var entityGenerator: IAzureStorageEntityGenerator;
    }

    export function generateDevelopmentStorageCredendentials(proxyUri?: string):string;

    export class ExponentialRetryPolicyFilter implements IAzureStorageFilter {
        constructor();
        handle(requestOptions, next);
    }

    export class LinearRetryPolicyFilter implements IAzureStorageFilter {
        constructor();
        handle(requestOptions, next);
    }
}