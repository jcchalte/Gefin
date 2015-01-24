/// <reference path="../../Scripts/GlobalReferences.d.ts"/>
describe("Nothing >", function () {
    it('should run', function (done) {
        expect("foo").to.equal("foo");
        done();
    });
});
