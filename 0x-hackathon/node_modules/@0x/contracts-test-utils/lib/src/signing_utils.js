"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("@0x/types");
var ethUtil = require("ethereumjs-util");
exports.signingUtils = {
    signMessage: function (message, privateKey, signatureType) {
        if (signatureType === types_1.SignatureType.EthSign) {
            var prefixedMessage = ethUtil.hashPersonalMessage(message);
            var ecSignature = ethUtil.ecsign(prefixedMessage, privateKey);
            var signature = Buffer.concat([
                ethUtil.toBuffer(ecSignature.v),
                ecSignature.r,
                ecSignature.s,
                ethUtil.toBuffer(signatureType),
            ]);
            return signature;
        }
        else if (signatureType === types_1.SignatureType.EIP712) {
            var ecSignature = ethUtil.ecsign(message, privateKey);
            var signature = Buffer.concat([
                ethUtil.toBuffer(ecSignature.v),
                ecSignature.r,
                ecSignature.s,
                ethUtil.toBuffer(signatureType),
            ]);
            return signature;
        }
        else {
            throw new Error(signatureType + " is not a valid signature type");
        }
    },
};
//# sourceMappingURL=signing_utils.js.map