import { useSignTxs } from "~/stores/global";
import {
  ESTIMATED_KEY_VALUE_SIZE,
  ESTIMATED_NODE_SIZE,
  EXTRA_STORAGE_BALANCE,
  INITIAL_ACCOUNT_STORAGE_BALANCE,
  MIN_STORAGE_BALANCE,
  STORAGE_COST_PER_BYTE,
  TX_GAS,
} from "./constants/tx";
import { getProfile, viewCall } from "./fetching";
import { type Profile } from "./validation/fetching";
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { type AccountId } from "./validation/common";
import { type Progress } from "./mutating";
import { useState } from "react";
import { type Optional, type Transaction } from "@near-wallet-selector/core";

export async function calculateDeposit(
  accountId: string,
  changes: Profile
): Promise<bigint> {
  const currentProfile = await getProfile(accountId);
  const storageDeposit = await viewCall<{ total: string; available: string }>(
    "social.near",
    "storage_balance_of",
    {
      account_id: accountId,
    }
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

export function estimateDataCost(
  data: unknown,
  previousData?: unknown
): bigint {
  if (data === null || !data) {
    return 0n;
  }

  if (
    typeof data === "string" ||
    typeof data === "boolean" ||
    typeof data === "number" ||
    typeof data === "bigint" ||
    typeof data === "symbol"
  ) {
    const stringData = data.toString();

    if (
      typeof previousData === "string" ||
      typeof previousData === "boolean" ||
      typeof previousData === "number" ||
      typeof previousData === "bigint" ||
      typeof previousData === "symbol"
    ) {
      return BigInt(
        Math.max(stringData.length, 8) - previousData.toString().length
      );
    }

    return BigInt(Math.max(stringData.length, 8));
  }

  if (typeof data === "object") {
    const innerDataVost = Object.entries(data).reduce((acc, [key, value]) => {
      if (
        typeof previousData === "object" &&
        previousData !== null &&
        key in previousData
      ) {
        return (
          acc +
          estimateDataCost(
            value,
            previousData[key as keyof typeof previousData]
          )
        );
      }

      return (
        acc +
        BigInt(key.length * 2) +
        ESTIMATED_KEY_VALUE_SIZE +
        estimateDataCost(value)
      );
    }, 0n);

    if (typeof previousData === "object" && previousData !== null) {
      return innerDataVost;
    } else {
      return innerDataVost + ESTIMATED_NODE_SIZE;
    }
  }

  return 0n;
}

export function createSocialUpdate(
  accountId: AccountId,
  profile: Profile,
  deposit: bigint
): Optional<Transaction, "signerId"> {
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

export function useSocialSet(): [
  progress: Progress,
  mutation: UseMutationResult<
    void,
    unknown,
    {
      accountId: AccountId;
      profile: Partial<Profile>;
    },
    unknown
  >
] {
  const signTxs = useSignTxs();
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState<Progress>({ value: 0, label: "" });

  return [
    progress,
    useMutation({
      mutationFn: async ({
        accountId,
        profile,
      }: {
        accountId: AccountId;
        profile: Partial<Profile>;
      }) => {
        let deposit = 0n;
        setProgress({ value: 25, label: "Calculating deposit..." });
        try {
          deposit = await calculateDeposit(accountId, profile);
          setProgress({ value: 50, label: "Deposit calculated" });
        } catch (e) {
          console.error(e);
          setProgress({ value: 25, label: "Error calculating deposit" });
        }

        setProgress({ value: 75, label: "Signing transaction..." });
        await signTxs([createSocialUpdate(accountId, profile, deposit)]);
        setProgress({ value: 100, label: "Transaction signed" });
      },
      onSuccess: async (_, { accountId }) => {
        await queryClient.invalidateQueries(["profile", accountId]);
      },
    }),
  ];
}
