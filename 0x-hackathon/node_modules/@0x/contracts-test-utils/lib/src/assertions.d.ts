import { RevertReason } from '@0x/types';
import { TransactionReceipt, TransactionReceiptWithDecodedLogs } from 'ethereum-types';
export declare type sendTransactionResult = Promise<TransactionReceipt | TransactionReceiptWithDecodedLogs | string>;
/**
 * Returns the expected error message for an 'invalid opcode' resulting from a
 * contract call. The exact error message depends on the backing Ethereum node.
 */
export declare function getInvalidOpcodeErrorMessageForCallAsync(): Promise<string>;
/**
 * Returns the expected error message for the given revert reason resulting from
 * a sendTransaction call. The exact error message depends on the backing
 * Ethereum node and whether it supports revert reasons.
 * @param reason a specific revert reason.
 * @returns the expected error message.
 */
export declare function getRevertReasonOrErrorMessageForSendTransactionAsync(reason: RevertReason): Promise<string>;
/**
 * Rejects if the given Promise does not reject with an error indicating
 * insufficient funds.
 * @param p a promise resulting from a contract call or sendTransaction call.
 * @returns a new Promise which will reject if the conditions are not met and
 * otherwise resolve with no value.
 */
export declare function expectInsufficientFundsAsync<T>(p: Promise<T>): Promise<void>;
/**
 * Resolves if the the sendTransaction call fails with the given revert reason.
 * However, since Geth does not support revert reasons for sendTransaction, this
 * falls back to expectTransactionFailedWithoutReasonAsync if the backing
 * Ethereum node is Geth.
 * @param p a Promise resulting from a sendTransaction call
 * @param reason a specific revert reason
 * @returns a new Promise which will reject if the conditions are not met and
 * otherwise resolve with no value.
 */
export declare function expectTransactionFailedAsync(p: sendTransactionResult, reason: RevertReason): Promise<void>;
/**
 * Resolves if the transaction fails without a revert reason, or if the
 * corresponding transactionReceipt has a status of 0 or '0', indicating
 * failure.
 * @param p a Promise resulting from a sendTransaction call
 * @returns a new Promise which will reject if the conditions are not met and
 * otherwise resolve with no value.
 */
export declare function expectTransactionFailedWithoutReasonAsync(p: sendTransactionResult): Promise<void>;
/**
 * Resolves if the the contract call fails with the given revert reason.
 * @param p a Promise resulting from a contract call
 * @param reason a specific revert reason
 * @returns a new Promise which will reject if the conditions are not met and
 * otherwise resolve with no value.
 */
export declare function expectContractCallFailedAsync<T>(p: Promise<T>, reason: RevertReason): Promise<void>;
/**
 * Resolves if the contract call fails without a revert reason.
 * @param p a Promise resulting from a contract call
 * @returns a new Promise which will reject if the conditions are not met and
 * otherwise resolve with no value.
 */
export declare function expectContractCallFailedWithoutReasonAsync<T>(p: Promise<T>): Promise<void>;
/**
 * Resolves if the contract creation/deployment fails without a revert reason.
 * @param p a Promise resulting from a contract creation/deployment
 * @returns a new Promise which will reject if the conditions are not met and
 * otherwise resolve with no value.
 */
export declare function expectContractCreationFailedAsync<T>(p: sendTransactionResult, reason: RevertReason): Promise<void>;
/**
 * Resolves if the contract creation/deployment fails without a revert reason.
 * @param p a Promise resulting from a contract creation/deployment
 * @returns a new Promise which will reject if the conditions are not met and
 * otherwise resolve with no value.
 */
export declare function expectContractCreationFailedWithoutReasonAsync<T>(p: Promise<T>): Promise<void>;
//# sourceMappingURL=assertions.d.ts.map