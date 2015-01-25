/// <reference path="../../../../Scripts/GlobalReferences.d.ts"/>
import nodeUuid = require("node-uuid");

export = Guid
class Guid {
    private value: string;

    constructor(innerValue?: string) {
        if (innerValue != null) {
            var uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
            if (!uuidRegex.test(innerValue))
                throw Error("invalid UUID");
            this.value = innerValue;

        } else {
            this.value = nodeUuid.v4();
        }
    }

    public innerValue() {
        return this.value;
    }

    public equals(other:Guid) {
        return this.innerValue() === other.innerValue();
    }
}