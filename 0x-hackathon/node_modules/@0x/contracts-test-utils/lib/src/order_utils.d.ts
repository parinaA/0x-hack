import { OrderWithoutExchangeAddress, SignedOrder } from '@0x/types';
import { BigNumber } from '@0x/utils';
import { CancelOrder, MatchOrder } from './types';
export declare const orderUtils: {
    getPartialAmountFloor(numerator: BigNumber, denominator: BigNumber, target: BigNumber): BigNumber;
    createFill: (signedOrder: SignedOrder, takerAssetFillAmount?: BigNumber | undefined) => {
        order: OrderWithoutExchangeAddress;
        takerAssetFillAmount: BigNumber;
        signature: string;
    };
    createCancel(signedOrder: SignedOrder, takerAssetCancelAmount?: BigNumber | undefined): CancelOrder;
    getOrderWithoutExchangeAddress(signedOrder: SignedOrder): OrderWithoutExchangeAddress;
    createMatchOrders(signedOrderLeft: SignedOrder, signedOrderRight: SignedOrder): MatchOrder;
};
//# sourceMappingURL=order_utils.d.ts.map