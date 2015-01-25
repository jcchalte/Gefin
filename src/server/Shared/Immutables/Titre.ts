export = Titre
class Titre {
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