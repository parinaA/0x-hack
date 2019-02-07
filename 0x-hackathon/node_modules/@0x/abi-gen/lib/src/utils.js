"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ethereum_types_1 = require("ethereum-types");
var fs = require("fs");
var _ = require("lodash");
var path = require("path");
var toSnakeCase = require("to-snake-case");
var types_1 = require("./types");
exports.utils = {
    solTypeToTsType: function (paramKind, backend, solType, components) {
        var e_1, _a;
        var trailingArrayRegex = /\[\d*\]$/;
        if (solType.match(trailingArrayRegex)) {
            var arrayItemSolType = solType.replace(trailingArrayRegex, '');
            var arrayItemTsType = exports.utils.solTypeToTsType(paramKind, backend, arrayItemSolType, components);
            var arrayTsType = exports.utils.isUnionType(arrayItemTsType) || exports.utils.isObjectType(arrayItemTsType)
                ? "Array<" + arrayItemTsType + ">"
                : arrayItemTsType + "[]";
            return arrayTsType;
        }
        else {
            var solTypeRegexToTsType = [
                { regex: '^string$', tsType: 'string' },
                { regex: '^address$', tsType: 'string' },
                { regex: '^bool$', tsType: 'boolean' },
                { regex: '^u?int\\d*$', tsType: 'BigNumber' },
                { regex: '^bytes\\d*$', tsType: 'string' },
            ];
            if (paramKind === types_1.ParamKind.Input) {
                // web3 and ethers allow to pass those as numbers instead of bignumbers
                solTypeRegexToTsType.unshift({
                    regex: '^u?int(8|16|32)?$',
                    tsType: 'number|BigNumber',
                });
            }
            if (backend === types_1.ContractsBackend.Ethers && paramKind === types_1.ParamKind.Output) {
                // ethers-contracts automatically converts small BigNumbers to numbers
                solTypeRegexToTsType.unshift({
                    regex: '^u?int(8|16|32|48)?$',
                    tsType: 'number',
                });
            }
            try {
                for (var solTypeRegexToTsType_1 = __values(solTypeRegexToTsType), solTypeRegexToTsType_1_1 = solTypeRegexToTsType_1.next(); !solTypeRegexToTsType_1_1.done; solTypeRegexToTsType_1_1 = solTypeRegexToTsType_1.next()) {
                    var regexAndTxType = solTypeRegexToTsType_1_1.value;
                    var regex = regexAndTxType.regex, tsType = regexAndTxType.tsType;
                    if (solType.match(regex)) {
                        return tsType;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (solTypeRegexToTsType_1_1 && !solTypeRegexToTsType_1_1.done && (_a = solTypeRegexToTsType_1.return)) _a.call(solTypeRegexToTsType_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var TUPLE_TYPE_REGEX = '^tuple$';
            if (solType.match(TUPLE_TYPE_REGEX)) {
                var componentsType = _.map(components, function (component) {
                    var componentValueType = exports.utils.solTypeToTsType(paramKind, backend, component.type, component.components);
                    var componentType = component.name + ": " + componentValueType;
                    return componentType;
                });
                var tsType = "{" + componentsType.join(';') + "}";
                return tsType;
            }
            throw new Error("Unknown Solidity type found: " + solType);
        }
    },
    isUnionType: function (tsType) {
        return tsType === 'number|BigNumber';
    },
    isObjectType: function (tsType) {
        return /^{.*}$/.test(tsType);
    },
    getPartialNameFromFileName: function (filename) {
        var name = path.parse(filename).name;
        return name;
    },
    getNamedContent: function (filename) {
        var name = exports.utils.getPartialNameFromFileName(filename);
        try {
            var content = fs.readFileSync(filename).toString();
            return {
                name: name,
                content: content,
            };
        }
        catch (err) {
            throw new Error("Failed to read " + filename + ": " + err);
        }
    },
    getEmptyConstructor: function () {
        return {
            type: ethereum_types_1.AbiType.Constructor,
            stateMutability: 'nonpayable',
            payable: false,
            inputs: [],
        };
    },
    makeOutputFileName: function (name) {
        var fileName = toSnakeCase(name);
        // HACK: Snake case doesn't make a lot of sense for abbreviated names but we can't reliably detect abbreviations
        // so we special-case the abbreviations we use.
        fileName = fileName.replace('z_r_x', 'zrx').replace('e_r_c', 'erc');
        return fileName;
    },
    writeOutputFile: function (filePath, renderedTsCode) {
        fs.writeFileSync(filePath, renderedTsCode);
    },
    isOutputFileUpToDate: function (abiFile, outputFile) {
        var abiFileModTimeMs = fs.statSync(abiFile).mtimeMs;
        try {
            var outFileModTimeMs = fs.statSync(outputFile).mtimeMs;
            return outFileModTimeMs > abiFileModTimeMs;
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                return false;
            }
            else {
                throw err;
            }
        }
    },
};
//# sourceMappingURL=utils.js.map