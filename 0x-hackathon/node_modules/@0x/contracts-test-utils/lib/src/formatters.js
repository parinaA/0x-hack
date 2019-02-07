"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var constants_1 = require("./constants");
var order_utils_1 = require("./order_utils");
exports.formatters = {
    createBatchFill: function (signedOrders, takerAssetFillAmounts) {
        if (takerAssetFillAmounts === void 0) { takerAssetFillAmounts = []; }
        var batchFill = {
            orders: [],
            signatures: [],
            takerAssetFillAmounts: takerAssetFillAmounts,
        };
        _.forEach(signedOrders, function (signedOrder) {
            var orderWithoutExchangeAddress = order_utils_1.orderUtils.getOrderWithoutExchangeAddress(signedOrder);
            batchFill.orders.push(orderWithoutExchangeAddress);
            batchFill.signatures.push(signedOrder.signature);
            if (takerAssetFillAmounts.length < signedOrders.length) {
                batchFill.takerAssetFillAmounts.push(signedOrder.takerAssetAmount);
            }
        });
        return batchFill;
    },
    createMarketSellOrders: function (signedOrders, takerAssetFillAmount) {
        var marketSellOrders = {
            orders: [],
            signatures: [],
            takerAssetFillAmount: takerAssetFillAmount,
        };
        _.forEach(signedOrders, function (signedOrder, i) {
            var orderWithoutExchangeAddress = order_utils_1.orderUtils.getOrderWithoutExchangeAddress(signedOrder);
            if (i !== 0) {
                orderWithoutExchangeAddress.takerAssetData = constants_1.constants.NULL_BYTES;
            }
            marketSellOrders.orders.push(orderWithoutExchangeAddress);
            marketSellOrders.signatures.push(signedOrder.signature);
        });
        return marketSellOrders;
    },
    createMarketBuyOrders: function (signedOrders, makerAssetFillAmount) {
        var marketBuyOrders = {
            orders: [],
            signatures: [],
            makerAssetFillAmount: makerAssetFillAmount,
        };
        _.forEach(signedOrders, function (signedOrder, i) {
            var orderWithoutExchangeAddress = order_utils_1.orderUtils.getOrderWithoutExchangeAddress(signedOrder);
            if (i !== 0) {
                orderWithoutExchangeAddress.makerAssetData = constants_1.constants.NULL_BYTES;
            }
            marketBuyOrders.orders.push(orderWithoutExchangeAddress);
            marketBuyOrders.signatures.push(signedOrder.signature);
        });
        return marketBuyOrders;
    },
    createBatchCancel: function (signedOrders) {
        var batchCancel = {
            orders: [],
        };
        _.forEach(signedOrders, function (signedOrder) {
            var orderWithoutExchangeAddress = order_utils_1.orderUtils.getOrderWithoutExchangeAddress(signedOrder);
            batchCancel.orders.push(orderWithoutExchangeAddress);
        });
        return batchCancel;
    },
};
//# sourceMappingURL=formatters.js.map