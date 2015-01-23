declare module "jake-jshint"
{
    export interface JSHintOptions {
        bitwise?: boolean;
        curly?: boolean;
        eqeqeq?: boolean;
        forin?: boolean;
        immed?: boolean;
        latedef?: boolean;
        newcap?: boolean;
        noarg?: boolean;
        noempty?: boolean;
        nonew?: boolean;
        regexp?: boolean;
        undef?: boolean;
        strict?: boolean;
        trailing?: boolean;
        node?: boolean;
    }

    export interface JSHintGlobals {
        describe?: boolean;
        it?: boolean;
        beforeEach?: boolean;
        afterEach?: boolean
    }

    export function validateFile(filename:string, options?: JSHintOptions, globals?: JSHintGlobals);
    export function validateFileList(fileList: string[], options?: JSHintOptions, globals?: JSHintGlobals): void;
}