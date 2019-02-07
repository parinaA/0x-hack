/**
 * Increases time by the given number of seconds and then mines a block so that
 * the current block timestamp has the offset applied.
 * @param seconds the number of seconds by which to incrase the time offset.
 * @returns a new Promise which will resolve with the new total time offset or
 * reject if the time could not be increased.
 */
export declare function increaseTimeAndMineBlockAsync(seconds: number): Promise<number>;
/**
 * Returns the timestamp of the latest block in seconds since the Unix epoch.
 * @returns a new Promise which will resolve with the timestamp in seconds.
 */
export declare function getLatestBlockTimestampAsync(): Promise<number>;
//# sourceMappingURL=block_timestamp.d.ts.map