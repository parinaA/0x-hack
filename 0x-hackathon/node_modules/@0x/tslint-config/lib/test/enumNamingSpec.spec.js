"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var enumNamingRule_1 = require("../rules/enumNamingRule");
var lintrunner_1 = require("./lintrunner");
var rule = 'enum-naming';
describe('enumNamingRule', function () {
    it("should not fail PascalCase", function () {
        var src = "enum test { MemberOne, MemberTwo }";
        var result = lintrunner_1.helper(src, rule);
        assert.equal(result.errorCount, 0);
    });
    it("should not fail PascalCase keys with uncased values", function () {
        var src = "enum test { MemberOne = 'member_one', MemberTwo = 'member two' }";
        var result = lintrunner_1.helper(src, rule);
        assert.equal(result.errorCount, 0);
    });
    it("should not fail PascalCase keys with numbers", function () {
        var src = "enum test { Member1 = 'member_one', MemberTwo = 'member two' }";
        var result = lintrunner_1.helper(src, rule);
        assert.equal(result.errorCount, 0);
    });
    it("should fail with camelCase", function () {
        var src = "enum test { memberOne, memberTwo }";
        var result = lintrunner_1.helper(src, rule);
        assert.equal(result.errorCount, 2);
    });
    it("should fail with snake case", function () {
        var src = "enum test { member_one, member_two }";
        var result = lintrunner_1.helper(src, rule);
        assert.equal(result.errorCount, 2);
    });
    it("should fail with all caps", function () {
        var src = "enum test { MEMBERONE, MEMBER_TWO }";
        var result = lintrunner_1.helper(src, rule);
        assert.equal(result.errorCount, 2);
    });
    it("should fail with mixed case", function () {
        var src = "enum test { member_one, MemberTwo }";
        var result = lintrunner_1.helper(src, rule);
        assert.equal(result.errorCount, 1);
    });
    it("should fail with the right position", function () {
        var src = "enum test { MemberOne, member_two }";
        var startPosition = src.indexOf('member_two');
        var endPosition = startPosition + 'member_two'.length;
        var failure = lintrunner_1.helper(src, rule).failures[0];
        assert.equal(failure.getStartPosition().getPosition(), startPosition);
        assert.equal(failure.getEndPosition().getPosition(), endPosition);
        assert.equal(failure.getFailure(), enumNamingRule_1.Rule.FAILURE_STRING);
    });
    it("should fail with the right message", function () {
        var src = "enum test { memberOne, memberTwo }";
        var failure = lintrunner_1.helper(src, rule).failures[0];
        assert.equal(failure.getFailure(), enumNamingRule_1.Rule.FAILURE_STRING);
    });
});
describe('enumNaming fixer', function () {
    it('should fix keys', function () {
        var src = "enum test { MemberOne, memberTwo, member_three, MEMBER_FOUR, MEMBERFIVE }";
        var expected = "enum test { MemberOne, MemberTwo, MemberThree, MemberFour, Memberfive }";
        var actual = lintrunner_1.getFixedResult(src, rule);
        var result = lintrunner_1.helper(src, rule);
        assert.equal(result.errorCount, 4); // tslint:disable-line:custom-no-magic-numbers
        assert.equal(actual, expected);
    });
    it('should not fix values', function () {
        var src = "enum test { MemberOne = 'MemberOne', memberTwo = 'memberTwo', member_three = 'member_three', MEMBER_FOUR = 'MEMBER_FOUR' }";
        var expected = "enum test { MemberOne = 'MemberOne', MemberTwo = 'memberTwo', MemberThree = 'member_three', MemberFour = 'MEMBER_FOUR' }";
        var actual = lintrunner_1.getFixedResult(src, rule);
        var result = lintrunner_1.helper(src, rule);
        assert.equal(result.errorCount, 3); // tslint:disable-line:custom-no-magic-numbers
        assert.equal(actual, expected);
    });
    it('should preserve values with equals sign', function () {
        var src = "enum Operators { assign = '=', EQUALS = '==', Triple_Equals = '===' }";
        var expected = "enum Operators { Assign = '=', Equals = '==', TripleEquals = '===' }";
        var actual = lintrunner_1.getFixedResult(src, rule);
        var result = lintrunner_1.helper(src, rule);
        assert.equal(result.errorCount, 3); // tslint:disable-line:custom-no-magic-numbers
        assert.equal(actual, expected);
    });
});
//# sourceMappingURL=enumNamingSpec.spec.js.map