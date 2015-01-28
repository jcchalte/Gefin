import nodeUuid = require("node-uuid");

export class Title {
    private innerValue: string;

    constructor(value: string) {
        this.innerValue = value;
    }

    public value() {
        return this.innerValue;
    }

    public equals(left: Title) {
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

export class Time {
    private hours: number;
    private minutes: number;

    constructor(hour: number, minutes:number) {
        this.hours = hour;
        this.minutes = minutes;
    }

    public equals(left: Time) {
        return this.hours === left.hours && this.minutes === left.minutes;
    }
}

export class Euros {
    private amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }

    public equals(left: Euros) {
        return this.amount === left.amount;
    }
}

export class Login {
    private innerValue: string;

    constructor(value: string) {
        this.innerValue = value;
    }

    public value() {
        return this.innerValue;
    }

    public equals(left: Login) {
        return this.value() === left.value();
    }
}