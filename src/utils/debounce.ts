/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-function-type */

export const debounce = <T extends Function>(fn: T, wait = 250) => {
  let timeout: number | null = null;
  return ((...args: any[]): void => {
    if (timeout) {
      window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(() => {
      fn(...args);
    }, wait);
  }) as any as T;
};
