'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
class SignedOrderModel {
    constructor(opts = {}) {
        this.hash = opts.hash;
        this.senderAddress = opts.senderAddress;
        this.makerAddress = opts.makerAddress;
        this.takerAddress = opts.takerAddress;
        this.makerAssetData = opts.makerAssetData;
        this.takerAssetData = opts.takerAssetData;
        this.exchangeAddress = opts.exchangeAddress;
        this.feeRecipientAddress = opts.feeRecipientAddress;
        this.expirationTimeSeconds = opts.expirationTimeSeconds;
        this.makerFee = opts.makerFee;
        this.takerFee = opts.takerFee;
        this.makerAssetAmount = opts.makerAssetAmount;
        this.takerAssetAmount = opts.takerAssetAmount;
        this.salt = opts.salt;
        this.signature = opts.signature;
        this.strikePrice = opts.strikePrice;
        this.baseToken = opts.baseToken;
        this.quoteToken = opts.quoteToken;
        this.numberOfBaseToken = opts.numberOfBaseToken;
        this.premium = opts.premium;
    } 
}
exports.SignedOrderModel = SignedOrderModel;
