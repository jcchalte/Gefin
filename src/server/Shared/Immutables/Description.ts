export = Description
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