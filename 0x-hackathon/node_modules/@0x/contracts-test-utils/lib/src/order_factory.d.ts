/// <reference types="node" />
import { Order, SignatureType, SignedOrder } from '@0x/types';
export declare class OrderFactory {
    private readonly _defaultOrderParams;
    private readonly _privateKey;
    constructor(privateKey: Buffer, defaultOrderParams: Partial<Order>);
    newSignedOrderAsync(customOrderParams?: Partial<Order>, signatureType?: SignatureType): Promise<SignedOrder>;
}
//# sourceMappingURL=order_factory.d.ts.map