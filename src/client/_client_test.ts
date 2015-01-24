/// <reference path="../../Scripts/GlobalReferences.d.ts"/>

describe("Nothing >", () => {
    it('should run', (done) => {
        expect("foo").to.equal("foo");
        done();
    });
});