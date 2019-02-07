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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var dirtyChai = require("dirty-chai");
var fs = require("fs");
require("mocha");
var tmp = require("tmp");
var utils_1 = require("../src/utils");
tmp.setGracefulCleanup(); // remove tmp files even if there are failures
chai.use(dirtyChai);
var expect = chai.expect;
describe('makeOutputFileName()', function () {
    it('should handle Metacoin usage', function () {
        expect(utils_1.utils.makeOutputFileName('Metacoin')).to.equal('metacoin');
    });
    it('should handle special zrx_token case', function () {
        expect(utils_1.utils.makeOutputFileName('ZRXToken')).to.equal('zrx_token');
    });
    it('should handle special erc_token case', function () {
        expect(utils_1.utils.makeOutputFileName('ERC20Token')).to.equal('erc20_token');
    });
});
describe('writeOutputFile()', function () {
    var tempFilePath;
    before(function () {
        tempFilePath = tmp.fileSync({ discardDescriptor: true }).name;
    });
    it('should write content to output file', function () {
        var content = 'hello world';
        utils_1.utils.writeOutputFile(tempFilePath, content);
        expect(fs.readFileSync(tempFilePath).toString()).to.equal(content);
    });
});
describe('isOutputFileUpToDate()', function () {
    it('should throw ENOENT when there is no abi file', function () {
        expect(utils_1.utils.isOutputFileUpToDate.bind('nonexistant1', 'nonexistant2')).to.throw('ENOENT');
    });
    describe('when the abi input file exists', function () {
        var abiFile;
        before(function () {
            abiFile = tmp.fileSync({ discardDescriptor: true }).name;
        });
        describe('without an existing output file', function () {
            it('should return false', function () {
                expect(utils_1.utils.isOutputFileUpToDate(abiFile, 'nonexistant_file')).to.be.false();
            });
        });
        describe('with an existing output file', function () {
            var outputFile;
            before(function () {
                outputFile = tmp.fileSync({ discardDescriptor: true }).name;
                var abiFileModTimeMs = fs.statSync(abiFile).mtimeMs;
                var outfileModTimeMs = abiFileModTimeMs + 1;
                fs.utimesSync(outputFile, outfileModTimeMs, outfileModTimeMs);
            });
            it('should return true when output file is newer than abi file', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    expect(utils_1.utils.isOutputFileUpToDate(abiFile, outputFile)).to.be.true();
                    return [2 /*return*/];
                });
            }); });
            it('should return false when output file exists but is older than abi file', function () {
                var outFileModTimeMs = fs.statSync(outputFile).mtimeMs;
                var abiFileModTimeMs = outFileModTimeMs + 1;
                fs.utimesSync(abiFile, abiFileModTimeMs, abiFileModTimeMs);
                expect(utils_1.utils.isOutputFileUpToDate(abiFile, outputFile)).to.be.false();
            });
        });
    });
});
//# sourceMappingURL=utils_test.js.map