import nodeUuid = require("node-uuid");

export class Titre {
    private innerValue: string;

    constructor(value: string) {
        this.innerValue = value;
    }

    public value() {
        return this.innerValue;
    }

    public equals(left: Titre) {
        return this.value() === left.value();
    }
}


export class Guid {
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

    public equals(other: Guid) {
        return this.innerValue() === other.innerValue();
    }
}

class Description {
    private innerValue: string;

    constructor(value: string) {
        this.innerValue = value;
    }

    public value() {
        return this.innerValue;
    }

    public equals(left: Description) {
        return this.value() === left.value();
    }
}