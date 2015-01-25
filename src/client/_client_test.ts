/// <reference path="../../Scripts/GlobalReferences.d.ts"/>
import client = require("./client");


describe("Nothing >", () => {
    it('should run', (done) => {
        client.init();

        var extractedDiv = document.getElementById('tdjs');
        expect(extractedDiv.getAttribute("foo")).equal("bar");
        done();
    });
});