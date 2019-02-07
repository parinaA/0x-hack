"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0x/utils");
var combinatorics = require("js-combinatorics");
var test_with_reference_1 = require("./test_with_reference");
// A set of values corresponding to the uint256 type in Solidity. This set
// contains some notable edge cases, including some values which will overflow
// the uint256 type when used in different mathematical operations.
exports.uint256Values = [
    new utils_1.BigNumber(0),
    new utils_1.BigNumber(1),
    new utils_1.BigNumber(2),
    // Non-trivial big number.
    new utils_1.BigNumber(2).pow(64),
    // Max that does not overflow when squared.
    new utils_1.BigNumber(2).pow(128).minus(1),
    // Min that does overflow when squared.
    new utils_1.BigNumber(2).pow(128),
    // Max that does not overflow when doubled.
    new utils_1.BigNumber(2).pow(255).minus(1),
    // Min that does overflow when doubled.
    new utils_1.BigNumber(2).pow(255),
    // Max that does not overflow.
    new utils_1.BigNumber(2).pow(256).minus(1),
];
// A set of values corresponding to the bytes32 type in Solidity.
exports.bytes32Values = [
    // Min
    '0x0000000000000000000000000000000000000000000000000000000000000000',
    '0x0000000000000000000000000000000000000000000000000000000000000001',
    '0x0000000000000000000000000000000000000000000000000000000000000002',
    // Non-trivial big number.
    '0x000000000000f000000000000000000000000000000000000000000000000000',
    // Max
    '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
];
/**
 * Uses combinatorics to test the behavior of a test function by comparing it to
 * the expected behavior (defined by a reference function) for a large number of
 * possible input values.
 *
 * First generates test cases by taking the cartesian product of the given
 * values. Each test case is a set of N values corresponding to the N arguments
 * for the test func and the reference func. For each test case, first the
 * reference function will be called to obtain an "expected result", or if the
 * reference function throws/rejects, an "expected error". Next, the test
 * function will be called to obtain an "actual result", or if the test function
 * throws/rejects, an "actual error". Each test case passes if at least one of
 * the following conditions is met:
 *
 * 1) Neither the reference function or the test function throw and the
 * "expected result" equals the "actual result".
 *
 * 2) Both the reference function and the test function throw and the "actual
 * error" message *contains* the "expected error" message.
 *
 * The first test case which does not meet one of these conditions will cause
 * the entire test to fail and this function will throw/reject.
 *
 * @param referenceFuncAsync a reference function implemented in pure
 * JavaScript/TypeScript which accepts N arguments and returns the "expected
 * result" or "expected error" for a given test case.
 * @param testFuncAsync a test function which, e.g., makes a call or sends a
 * transaction to a contract. It accepts the same N arguments returns the
 * "actual result" or "actual error" for a given test case.
 * @param values an array of N arrays. Each inner array is a set of possible
 * values which are passed into both the reference function and the test
 * function.
 * @return A Promise that resolves if the test passes and rejects if the test
 * fails, according to the rules described above.
 */
function testCombinatoriallyWithReferenceFuncAsync(name, referenceFuncAsync, testFuncAsync, allValues) {
    return __awaiter(this, void 0, void 0, function () {
        var testCases, counter;
        var _this = this;
        return __generator(this, function (_a) {
            testCases = combinatorics.cartesianProduct.apply(combinatorics, __spread(allValues));
            counter = 0;
            testCases.forEach(function (testCase) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    counter += 1;
                    it(name + " " + counter + "/" + testCases.length, function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, test_with_reference_1.testWithReferenceFuncAsync(referenceFuncAsync, testFuncAsync, testCase)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.testCombinatoriallyWithReferenceFuncAsync = testCombinatoriallyWithReferenceFuncAsync;
//# sourceMappingURL=combinatorial_utils.js.map