﻿import nodeUuid = require("node-uuid");

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
    private innerValue: string;

    constructor(innerValue?: string) {
        if (innerValue != null) {
            var uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
            if (!uuidRegex.test(innerValue))
                throw Error("invalid UUID");
            this.innerValue = innerValue;

        } else {
            this.innerValue = nodeUuid.v4();
        }
    }

    public value() {
        return this.innerValue;
    }

    public equals(other: Guid) {
        return this.value() === other.value();
    }
}

export class Description {
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

export class Heure {
    private heure: number;
    private minutes: number;

    constructor(heure: number, minutes:number) {
        this.heure = heure;
        this.minutes = minutes;
    }

    public equals(left: Heure) {
        return this.heure === left.heure && this.minutes === left.minutes;
    }
}


export class Euros {
    private montant: number;

    constructor(montant: number) {
        this.montant = montant;
    }

    public equals(left: Euros) {
        return this.montant === left.montant;
    }
}

