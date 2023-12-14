import {
  ESTIMATED_KEY_VALUE_SIZE,
  ESTIMATED_NODE_SIZE,
  EXTRA_STORAGE_BALANCE,
  INITIAL_ACCOUNT_STORAGE_BALANCE,
  MIN_STORAGE_BALANCE,
  STORAGE_COST_PER_BYTE,
  TX_GAS,
} from "../constants/tx";
import { getProfile, viewCall } from "./fetching";
import { type AccountId } from "../validation/common";
import { type Optional, type Transaction } from "@near-wallet-selector/core";

export async function calculateDeposit(
  accountId: string,
  changes: Record<string, unknown>,
): Promise<bigint> {
  const currentProfile = await getProfile(accountId);
  const storageDeposit = await viewCall<{ total: string; available: string }>(
    "social.near",
    "storage_balance_of",
    {
      account_id: accountId,
    },
  );

  const [storageBalance, initialAccountStorageBalance, minStorageBalance] =
    storageDeposit
      ? [BigInt(storageDeposit.available), 0n, 0n]
      : [0n, INITIAL_ACCOUNT_STORAGE_BALANCE, MIN_STORAGE_BALANCE];
  const dataCost =
    estimateDataCost(changes, currentProfile) * STORAGE_COST_PER_BYTE;
  let totalCost =
    dataCost + initialAccountStorageBalance + EXTRA_STORAGE_BALANCE;
  if (totalCost < 0n) {
    totalCost = 0n;
  }

  totalCost -= storageBalance;
  if (totalCost < 0n) {
    totalCost = 0n;
  }

  if (totalCost < minStorageBalance) {
    return minStorageBalance;
  } else {
    return totalCost;
  }
}

export function isPrimitive(
  value: unknown,
): value is string | number | bigint | boolean | symbol {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "bigint" ||
    typeof value === "symbol" ||
    typeof value === "boolean"
  );
}

export function estimateDataCost(
  data: unknown,
  previousData?: unknown,
): bigint {
  if (!data) {
    return 0n;
  }

  if (isPrimitive(data)) {
    let dataLength = Math.max(data.toString().length, 8);

    if (isPrimitive(previousData)) {
      dataLength -= previousData.toString().length;
    }

    return BigInt(dataLength);
  }

  if (typeof data !== "object") {
    return 0n;
  }

  let innerDataCost = Object.entries(data).reduce((acc, [key, value]) => {
    if (
      typeof previousData === "object" &&
      !!previousData &&
      key in previousData
    ) {
      return (
        acc +
        estimateDataCost(value, previousData[key as keyof typeof previousData])
      );
    }

    return (
      acc +
      BigInt(key.length * 2) +
      ESTIMATED_KEY_VALUE_SIZE +
      estimateDataCost(value)
    );
  }, 0n);

  if (typeof previousData !== "object" || !previousData) {
    innerDataCost += ESTIMATED_NODE_SIZE;
  }

  return innerDataCost;
}

function formatForSocialDb(
  profile: Record<string, unknown>,
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(profile).map(([key, value]) => {
      if (isPrimitive(value)) {
        return [key, value.toString()];
      }

      if (!value) {
        return [key, null];
      }

      if (Array.isArray(value)) {
        return [key, Object.fromEntries(value.map((v) => [v, ""]))];
      }

      if (typeof value === "object") {
        return [key, formatForSocialDb(value as Record<string, unknown>)];
      }

      return [key, value];
    }),
  ) as Record<string, unknown>;
}

export function createSocialUpdate(
  accountId: AccountId,
  profile: Record<string, unknown>,
  deposit: bigint,
): Optional<Transaction, "signerId"> {
  profile = formatForSocialDb(profile);
  return {
    receiverId: "social.near",
    actions: [
      {
        type: "FunctionCall",
        params: {
          methodName: "set",
          args: {
            data: { [accountId]: { profile } },
          },
          gas: TX_GAS.toString(),
          deposit: deposit.toString(),
        },
      },
    ],
  };
}
