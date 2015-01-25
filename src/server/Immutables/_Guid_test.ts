/// <reference path="../../../Scripts/GlobalReferences.d.ts"/>
import Immutables = require("./Immutables");
import assert = require("assert");
require("should");

describe("Guid >", () => {
    var VALID_UUID = "88cb76d4-8502-4547-8367-970be70b3b59";

    it("Guid can be created", () => {
        var guid = new Immutables.Guid();
        assert.ok(guid);
    });

    it("Guid can be return inner value", () => {
        var guid = new Immutables.Guid();
        assert.ok(guid.innerValue());
    });

    it("two subsequent Guid calls should not share the same inner value", () => {
        var guid = new Immutables.Guid(),
            guid2 = new Immutables.Guid();
        assert.ok(guid.innerValue() !== guid2.innerValue());
    });

    it("Guid can be constructed from a valid value", () => {
        var guid = new Immutables.Guid(VALID_UUID);
        assert.ok(guid);
    });

    it("Guid cannot be constructed from an invalid value", () => {
        // ReSharper disable once WrongExpressionStatement
        assert.throws(() => { new Immutables.Guid("invalid value"); });
    });


    it("two subsequent Guid calls should not share the same inner value", () => {
        var guid = new Immutables.Guid(VALID_UUID),
            guid2 = new Immutables.Guid(VALID_UUID);

        assert.ok(guid.equals(guid2));
    });
});