/**
 * sleep function
 * This function waits for a specified time(`ms`) in milliseconds.
 *
 * @param {number} ms - the time in milliseconds to wait
 * @returns returns an unknown promise.
 *
 * @example
 * # Usage
 * ```ts
 * await sleep(300);
 * ```
 *
 * # Result
 * ```ts
 * unknown
 * ```
 */
export const sleep = (ms: number): Promise<unknown> => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};
