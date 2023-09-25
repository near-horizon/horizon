export const ESTIMATED_KEY_VALUE_SIZE: bigint = 40n * 3n + 8n + 12n;
export const ESTIMATED_NODE_SIZE: bigint = 40n * 2n + 8n + 10n;
export const STORAGE_COST_PER_BYTE: bigint = 10n ** 19n;
export const MIN_STORAGE_BALANCE: bigint = STORAGE_COST_PER_BYTE * 2000n;
export const INITIAL_ACCOUNT_STORAGE_BALANCE: bigint =
  STORAGE_COST_PER_BYTE * 500n;
export const EXTRA_STORAGE_BALANCE: bigint = STORAGE_COST_PER_BYTE * 2000n;

export const TGAS: bigint = 10n ** 12n;
export const TX_GAS: bigint = 300n * TGAS;
