import { Web3Wrapper } from '@0x/web3-wrapper';
import { ContractArtifact, DecodedLogArgs, LogEntry, LogWithDecodedArgs, RawLog, TransactionReceiptWithDecodedLogs } from 'ethereum-types';
export declare class LogDecoder {
    private readonly _web3Wrapper;
    private readonly _abiDecoder;
    static wrapLogBigNumbers(log: any): any;
    constructor(web3Wrapper: Web3Wrapper, artifacts: {
        [contractName: string]: ContractArtifact;
    });
    decodeLogOrThrow<ArgsType extends DecodedLogArgs>(log: LogEntry): LogWithDecodedArgs<ArgsType> | RawLog;
    getTxWithDecodedLogsAsync(txHash: string): Promise<TransactionReceiptWithDecodedLogs>;
}
//# sourceMappingURL=log_decoder.d.ts.map