export = ReadOnly;
module ReadOnly {
    export interface Field<TField> {
        (): TField;
        equals(left: Field<TField>);
    }

    export function field<TField>(value: TField): Field<TField> {
        var result = <Field<TField>> (() => { return value; });
        result.equals = (left: Field<TField>) => {
            if (value['equals'])
                return value['equals'](left());
            else return value === left();
        }
        return result;
    }
}