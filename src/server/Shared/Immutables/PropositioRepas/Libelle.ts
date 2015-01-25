export = Libelle
class Libelle {
    private innerValue: string;

    constructor(value: string) {
        this.innerValue = value;
    }

    public value() {
        return this.innerValue;
    }

    public equals(left: Libelle) {
        return this.value() === left.value();
    }
}