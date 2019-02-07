import { EventAbi, MethodAbi } from 'ethereum-types';
export declare enum ParamKind {
    Input = "input",
    Output = "output"
}
export declare enum ContractsBackend {
    Web3 = "web3",
    Ethers = "ethers"
}
export interface Method extends MethodAbi {
    singleReturnValue: boolean;
    hasReturnValue: boolean;
    tsName: string;
    functionSignature: string;
}
export interface ContextData {
    contractName: string;
    methods: Method[];
    events: EventAbi[];
}
//# sourceMappingURL=types.d.ts.map