define(["require", "exports", "./client"], function(require, exports, client) {
    describe("Nothing >", function () {
        it('should run', function (done) {
            client.init();

            var extractedDiv = document.getElementById('tdjs');
            expect(extractedDiv.getAttribute("foo")).equal("bar");
            done();
        });
    });
});
