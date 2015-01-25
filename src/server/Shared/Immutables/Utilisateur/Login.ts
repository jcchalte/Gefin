export = Login
class Login {
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