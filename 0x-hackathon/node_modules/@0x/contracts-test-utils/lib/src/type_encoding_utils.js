"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0x/utils");
var BN = require("bn.js");
var ethUtil = require("ethereumjs-util");
var constants_1 = require("./constants");
exports.typeEncodingUtils = {
    encodeUint256: function (value) {
        var base = 10;
        var formattedValue = new BN(value.toString(base));
        var encodedValue = ethUtil.toBuffer(formattedValue);
        // tslint:disable-next-line:custom-no-magic-numbers
        var paddedValue = ethUtil.setLengthLeft(encodedValue, constants_1.constants.WORD_LENGTH);
        return paddedValue;
    },
    decodeUint256: function (encodedValue) {
        var formattedValue = ethUtil.bufferToHex(encodedValue);
        var value = new utils_1.BigNumber(formattedValue, constants_1.constants.BASE_16);
        return value;
    },
};
//# sourceMappingURL=type_encoding_utils.js.map