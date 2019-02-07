"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_utils_1 = require("@0x/order-utils");
var crypto_1 = require("@0x/order-utils/lib/src/crypto");
exports.addressUtils = {
    generatePseudoRandomAddress: function () {
        var randomBigNum = order_utils_1.generatePseudoRandomSalt();
        var randomBuff = crypto_1.crypto.solSHA3([randomBigNum]);
        var randomAddress = "0x" + randomBuff.slice(0, 20).toString('hex');
        return randomAddress;
    },
};
//# sourceMappingURL=address_utils.js.map