import { SignedOrder } from '@0x/types';
import { BigNumber } from '@0x/utils';
import { BatchCancelOrders, BatchFillOrders, MarketBuyOrders, MarketSellOrders } from './types';
export declare const formatters: {
    createBatchFill(signedOrders: SignedOrder[], takerAssetFillAmounts?: BigNumber[]): BatchFillOrders;
    createMarketSellOrders(signedOrders: SignedOrder[], takerAssetFillAmount: BigNumber): MarketSellOrders;
    createMarketBuyOrders(signedOrders: SignedOrder[], makerAssetFillAmount: BigNumber): MarketBuyOrders;
    createBatchCancel(signedOrders: SignedOrder[]): BatchCancelOrders;
};
//# sourceMappingURL=formatters.d.ts.map